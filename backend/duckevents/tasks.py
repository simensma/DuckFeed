from datetime import timedelta

from django.db.models import F
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
    qs = (FeedEntry.objects
            .exclude(schedule=None)
            .order_by('-date')
            .distinct('schedule')
            .annotate(next_date=F('date') + timedelta(days=1)*F('schedule__days'))
            .filter(next_date__gte=current_date)
          )

    # Make a copy of the events
    new_entites = qs.map(_clone_feed_entry)

    if len(new_entites):
        # And actually create them
        FeedEntry.objects.bulk_create(qs)
