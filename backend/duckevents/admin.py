from django.contrib import admin

from duckevents.models import Country, FoodType, FeedEntry

admin.site.register(Country)
admin.site.register(FoodType)
admin.site.register(FeedEntry)
