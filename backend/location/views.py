from rest_framework.generics import RetrieveAPIView
from .models import Location
from .serializers import LocationSerializer

class LocationDetailView(RetrieveAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
