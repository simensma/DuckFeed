from datetime import timedelta

from django.db.models import F
from django.utils import timezone

from duckevents.models import FeedEntry
from background_task import background


def _clone_feed_entry(entry):
    entry.pk = None

    return entry


@background(schedule=5)
def insert_scheduled_events():
    current_date = timezone.now()

    qs = (FeedEntry.objects
            .exclude(schedule=None)
            .order_by('-date')
            .distinct('schedule')
            .annotate(next_date=F('date') + timedelta(days=1)*F('schedule__days'))
            .filter(next_date__gte=current_date)
          )

    new_entites = qs.map(_clone_feed_entry)

    if len(new_entites):
        FeedEntry.objects.bulk_create(qs)
