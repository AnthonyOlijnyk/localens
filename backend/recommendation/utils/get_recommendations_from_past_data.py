from django.db.models import Sum

from ..constants import NUM_RECOMMENDATIONS

from location.models import Location
from recommendation.models import Recommendation

from location.serializers import LocationSerializer

def get_recommendations_with_confidence_totals_query(user_id):
    return Recommendation.objects.filter(
                user_id=user_id
            ).select_related(
                'location'
            ).values(
                'location__type', 
                'location__id'
            ).annotate(
                total_confidence=Sum('confidence')
            ).order_by(
                '-total_confidence'
            )

def get_recommendations_from_past_data(user_id):
    ids = {
        'Restaurant': [],
        'Hotel': [],
        'Activity': []
    }
    results = ids.copy()

    recommendations_query = get_recommendations_with_confidence_totals_query(user_id)

    for location_type in ids.keys():
        for recommendation in recommendations_query.filter(location__type=location_type)[:NUM_RECOMMENDATIONS]:
            ids[location_type].append(recommendation['location__id'])

        locations = list(Location.objects.filter(id__in=ids[location_type]))

        if len(locations) < NUM_RECOMMENDATIONS:
            locations.extend(list(Location.objects.filter(type=location_type).exclude(id__in=ids[location_type]).order_by('?')[:NUM_RECOMMENDATIONS-len(locations)]))

        serializer = LocationSerializer(locations, many=True)

        results[location_type] = serializer.data

    return results


