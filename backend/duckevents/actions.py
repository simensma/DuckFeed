import csv

from django.http import HttpResponse


class DownloadFeedCsvMixin:
    """
    Mixin that can be used to download a csv version of all FeedEntries in the given queryset
    """
    def download_as_csv(self, request, queryset):
        """
        Downloads all FeedEntries in queryset as a CSV file called feed_entries.csv

        :param request: Required user request object, used if you for example want to do more fine grained permission checkcs
        :param queryset: FeedEntry queryset to be downloaded as csv
        :return: feed_entries.csv a csv file of all entries in queryset
        """
        field_names = ['date', 'quantity', 'description', 'city', 'park', 'country_code', 'country_name', 'food_type_id', 'food_type_name']

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format('feed_entries')
        writer = csv.writer(response)

        writer.writerow(field_names)
        for entry in queryset:
            writer.writerow(self._format_entry_as_list(entry))

        return response

    def _format_entry_as_list(self, entry):
        return [
            entry.date,
            entry.quantity,
            entry.description,
            entry.city,
            entry.park,
            entry.country.code,
            entry.country.name,
            entry.food_type.id,
            entry.food_type.name,
        ]
