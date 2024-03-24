from django.http import JsonResponse

from rest_framework.views import APIView

from operator import add

from .utils.web_scrape import scrape_web_pages
from .utils.model_prediction import predict
from .utils.get_recommendations_from_past_data import get_recommendations_from_past_data

from recommendation.constants import NUM_RECOMMENDATIONS

from core.authorization import get_user_id

from location.models import Location
from location.serializers import LocationSerializer

from user.models import User

from recommendation.models import Recommendation

class MakeRecommendationView(APIView):
        def get_top_results(self, final_confidence_values, type):
            indexes = sorted(range(len(final_confidence_values)), key=lambda x:final_confidence_values[x], reverse=True)

            ids = [index + 1 for index in indexes]
            final_ids = [id for id in ids if id in [location.id for location in Location.objects.filter(type=type)]]
            return final_ids[:NUM_RECOMMENDATIONS]
        
        def create_recommendation_records(self, top_locations, user_id, final_confidence_values):
             for location, confidence in zip(top_locations, final_confidence_values):
                  Recommendation.objects.create(
                       user_id=user_id,
                       location=location,
                       confidence=confidence
                  )
                      

        def post(self, request):
            user_id = get_user_id(request)
            type = request.data['type']

            prediction_weights = predict(request.data)
            bonus_weights = scrape_web_pages(type)

            final_confidence_values = list( map(add, prediction_weights, bonus_weights) )

            ids = self.get_top_results(final_confidence_values, type)

            top_locations = Location.objects.filter(pk__in=ids)

            self.create_recommendation_records(top_locations, user_id, final_confidence_values)

            serializer = LocationSerializer(top_locations, many=True)

            return JsonResponse(serializer.data, safe=False, status=200)
        
class GetRecommendationsFromPastData(APIView):
    def get(self, request):
        user_id = get_user_id(request)

        recommendations = get_recommendations_from_past_data(user_id)

        return JsonResponse(recommendations, safe=False, status=200)


        

