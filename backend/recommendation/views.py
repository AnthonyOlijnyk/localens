from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status

from django.http import JsonResponse

from core.utils.authorization import check_user_authorized, get_user_id
from core.utils.network import make_error_response, make_success_response

from .models import Recommendation
from location.serializers import LocationSerializer

from .forms import MakeReservationForm
from .serializers import ReservationSerializer  

class FetchRecommendationView(APIView):
    def get(self, request):
        authorization_error = check_user_authorized(request)

        if authorization_error:
            return authorization_error

        user_id = get_user_id(request)

        locations = random.sample(Location.objects.all(), s)
        serializer = LocationSerializer(locations, many=True)
        
        return JsonResponse(serializer.data, safe=False)