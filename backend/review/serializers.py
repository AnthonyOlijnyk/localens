from rest_framework.serializers import ModelSerializer

from .models import Review

from location.serializers import LocationSerializer

class ReviewSerializer(ModelSerializer):
    location = LocationSerializer(read_only = True)

    class Meta:
        model = Review
        fields = (
            'id',
            'text',
            'location'
        )
