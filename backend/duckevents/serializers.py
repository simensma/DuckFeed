from rest_framework import serializers

from duckevents.models import Country, FoodType, FeedEntry


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('name', 'code')


class FoodTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodType
        fields = ('id', 'name')


class FeedEntrySerializer(serializers.ModelSerializer):
    foodType = serializers.PrimaryKeyRelatedField(queryset=FoodType.objects.all(), source='food_type')
    country = serializers.SlugRelatedField(slug_field='code', queryset=Country.objects.all())

    class Meta:
        model = FeedEntry
        fields = ('date', 'quantity', 'description', 'city', 'park', 'country', 'foodType')
