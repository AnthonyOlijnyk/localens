from django.http import JsonResponse
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from .models import Location
from .serializers import LocationSerializer

class LocationDetailView(RetrieveAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class LocationListView(APIView):
    def get(self, request):
        # Get all location objects
        locations = Location.objects.all()
        
        # Serialize the location data
        serializer = LocationSerializer(locations, many=True)
        
        # Return a JSON response with the serialized data
        return JsonResponse(serializer.data, safe=False, status=200)
