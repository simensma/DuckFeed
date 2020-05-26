from datetime import timedelta

from django.db import models
from django.db.models import F, ExpressionWrapper, OuterRef, Max, Subquery
from django.utils import timezone

from duckevents.models import FeedEntry
from background_task import background


def _clone_feed_entry(entry):
    """
    "Clones" <entry> by removing the reference to the given enries primary key
    so a new DB entity is created when saved instead of updated.

    Note: Doing it this way for simplicity sake as we don't currently have any nested objects
    we need to clone as well. `schedule` will still point to the existing schedule, which is what we want.
    """
    entry.pk = None
    entry.date += timedelta(days=entry.schedule.days)
    entry.created = timezone.now()

    return entry


@background(schedule=5)
def insert_scheduled_events():
    """
    Creates new FeedEntry events for existing events that are overdue for a new
    event based on their schedule.

    1. Find the latest event per schedule where event.date + event.schedule.days > current date
    2. Insert a new event with the same data, and a date increased by entry.schedule.days
    """
    current_date = timezone.now()

    # Find FeedEntries that are overdue for a new event based on their schedule
    qs = (
        FeedEntry.objects
            .filter(
                date=Subquery(
                    # Find lates event (max date) per schedule
                    FeedEntry.objects
                        .filter(schedule=OuterRef('schedule'))
                        .values('schedule')
                        .annotate(last_event_date=Max('date'))
                        .values('last_event_date')[:1]
                    )
            )
            # Calculate the date the next event should happen
            .annotate(next_date=
                ExpressionWrapper(F('date') + timedelta(days=1) * F('schedule__days'), output_field=models.DateTimeField())
            )
            # Only select the entries that are overdue for another entry
            .filter(next_date__gte=current_date)
    )

    # Make a copy of the events
    new_entites = list(map(_clone_feed_entry, qs))

    if len(new_entites):
        # And actually create them
        FeedEntry.objects.bulk_create(qs)
