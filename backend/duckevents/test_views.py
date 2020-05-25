import json

from django.test import TestCase, Client
from django.utils import timezone
from rest_framework import status
from django.urls import reverse

from duckevents.models import FeedEntry

client = Client()


class TestDuckFeedEntryViewSet(TestCase):
    def setUp(self) -> None:
        self.endpoint = reverse('entry-list')

        self.valid_entry = {
            'date': timezone.now().isoformat(),
            'quantity': 1,
            'park': 'Beacon Hill Park',
            'country': 'CA',
            'city': 'Victoria',
            'foodType': 1
        }

        self.invalid_entry = {
            'date': None,
            'quantity': None,
            'park': None,
            'country': None,
            'foodType': None
        }

    def test_createEntry_shouldReturn400_whenRequestIsInvalid(self):
        response = self._post(self.invalid_entry)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_createEntry_shouldNotCreateEntry_whenRequestIsInvalid(self):
        self._post(self.invalid_entry)

        entry_count = FeedEntry.objects.all().count()
        self.assertEqual(0, entry_count)

    def test_createEntry_shouldReturn200_whenRequestIsValid(self):
        response = self._post(self.valid_entry)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_createEntry_shouldCreateEntity_whenRequestIsValid(self):
        self._post(self.valid_entry)

        entry_count = FeedEntry.objects.all().count()
        self.assertEqual(1, entry_count)

    def test_createEntry_shouldReturn400_whenCountryDoesntExist(self):
        test_request = self.valid_entry
        test_request['country'] = 'TEST'

        response = self._post(test_request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_createEntry_shouldReturn400_whenFoodTypeDoesntExist(self):
        test_request = self.valid_entry
        test_request['foodType'] = 90000

        response = self._post(test_request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_listEntries_shouldReturn405(self):
        """
        Make sure you're not allowed to list entries
        """
        response = client.get(
            reverse('entry-list'),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def _post(self, data):
        return client.post(
            reverse('entry-list'),
            data=json.dumps(data),
            content_type='application/json'
        )