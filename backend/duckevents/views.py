from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny

from duckevents.models import FeedEntry
from duckevents.serializers import FeedEntrySerializer


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
