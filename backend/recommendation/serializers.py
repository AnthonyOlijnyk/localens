from rest_framework.serializers import ModelSerializer

from .models import Recommendation

from user.serializers import UserSerializer
from location.serializers import LocationSerializer

class RecommendationSerializer(ModelSerializer):
    user = UserSerializer(read_only = True)
    location = LocationSerializer(read_only = True)

    class Meta:
        model = Recommendation
        fields = (
            'id',
            'confidence',
            'user',
            'location'
        )
