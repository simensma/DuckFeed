from django.contrib import admin

from duckevents.actions import DownloadFeedCsvMixin
from duckevents.models import Country, FoodType, FeedEntry

# Add country to admin interface
admin.site.register(Country)

# Add food type to admin interface
admin.site.register(FoodType)


@admin.register(FeedEntry)
class FeedEntryAdmin(admin.ModelAdmin, DownloadFeedCsvMixin):
    """
    Adds a List view of FeedEntries to the django admin interface, and adds the
    ability to download the entries as csv
    """
    list_display = ("date", "quantity", "city", "park", "country", "food_type")
    list_filter = ("city", "country", "food_type", "quantity")
    actions = ["download_as_csv"]
