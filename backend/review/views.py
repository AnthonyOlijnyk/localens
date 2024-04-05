from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Review
from .serializers import ReviewSerializer

class ReviewsByLocationView(APIView):
    def get(self, request, location_id, format=None):
        reviews = Review.objects.filter(location__id=location_id)  # Assuming `location` is the related name in the Review model
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
