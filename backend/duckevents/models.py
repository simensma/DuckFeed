from django.db import models


class Country(models.Model):
    """
    Model that represents a country.
    """
    name = models.CharField(null=False, blank=False, max_length=250)
    code = models.CharField(null=False, blank=False, max_length=10, unique=True)

    def __str__(self):
        return '{} - {}'.format(self.code, self.name)

    class Meta:
        db_table = 'country'


class FoodType(models.Model):
    """
    Model that represents a duck food type.
    """
    name = models.CharField(null=False, blank=False, max_length=250)

    def __str__(self):
        return '{} - {}'.format(self.id, self.name)

    class Meta:
        db_table = 'food_type'


class FeedEntry(models.Model):
    """
    Model that represents a feed entry submission.
    """
    date = models.DateTimeField(null=False, blank=False)
    quantity = models.PositiveIntegerField(null=False, blank=False)
    description = models.TextField(null=True, blank=True, max_length=500)
    city = models.CharField(null=False, blank=False, max_length=250)
    park = models.CharField(null=False, blank=False, max_length=250)
    country = models.ForeignKey(Country, null=False, blank=False, on_delete=models.CASCADE)
    food_type = models.ForeignKey(FoodType, null=False, blank=False, on_delete=models.CASCADE)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{} - {} - {} - {}'.format(self.date, self.city, self.country, self.food_type.name)

    class Meta:
        db_table = 'feed_entry'
        ordering = ['-date']
