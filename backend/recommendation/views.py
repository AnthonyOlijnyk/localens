from rest_framework.views import APIView

from django.http import JsonResponse

from location.models import Location
from location.serializers import LocationSerializer

NUM_RECOMMENDATIONS = 5

class MakeRecommendationView(APIView):
        def post(self, request):
            locations = Location.objects.order_by('?')[:NUM_RECOMMENDATIONS]
            serializer = LocationSerializer(locations, many=True)
            
            return JsonResponse(serializer.data, safe=False)