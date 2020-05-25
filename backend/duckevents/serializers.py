from rest_framework import serializers

from duckevents.models import Country, FoodType, FeedEntry, FeedSchedule


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('name', 'code')


class FoodTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodType
        fields = ('id', 'name')


class FeedScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedSchedule
        fields = ('days',)


class FeedEntrySerializer(serializers.ModelSerializer):
    foodType = serializers.PrimaryKeyRelatedField(queryset=FoodType.objects.all(), source='food_type')
    country = serializers.SlugRelatedField(slug_field='code', queryset=Country.objects.all())
    schedule = FeedScheduleSerializer(required=False)

    class Meta:
        model = FeedEntry
        fields = ('date', 'quantity', 'description', 'city', 'park', 'country', 'foodType', 'schedule')

    def create(self, validated_data):
        """
        Override create method to also create nested schedule if passed in.

        validated_data has already been validated by the serializer, and only contains fields defined here,
        so it's safe to use directly to create the required entities.

        :param validated_data: Validated post body
        :return: Created FeedEntry instance
        """
        if 'schedule' in validated_data:
            schedule_data = validated_data.pop('schedule')
            schedule = FeedSchedule.objects.create(**schedule_data) if schedule_data else None
        else:
            schedule = None

        return FeedEntry.objects.create(schedule=schedule, **validated_data)
