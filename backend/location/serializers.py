from rest_framework.serializers import ModelSerializer

from .models import Location

class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = (
            'id',
            'type',
            'name',
            'about',
            'average_rating',
            'latitude',
            'longitude',
            'is_family_friendly',
            'average_cost',
            'start_time',
            'end_time',
            'reviews'
        )
