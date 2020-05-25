from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny

from duckevents.models import FeedEntry, FoodType, Country
from duckevents.serializers import FeedEntrySerializer, FoodTypeSerializer, CountrySerializer


class DuckFeedEntryViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    API endpoint for creating new feed events
    This endpoint is open to everyone.

    The given post data is validated by FeedEntrySerializer and the appropriate model constraints set by FeedEntry itself
    before a new entry is created.
    """
    queryset = FeedEntry.objects.all()
    serializer_class = FeedEntrySerializer
    permission_classes = (AllowAny, )


class FoodTypeViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    API endpoint for retrieving food types
    This endpoint is open to everyone.
    """
    queryset = FoodType.objects.all()
    serializer_class = FoodTypeSerializer
    permission_classes = (AllowAny, )


class CountryViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    API endpoint for retrieving countries
    This endpoint is open to everyone.
    """
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    permission_classes = (AllowAny, )
