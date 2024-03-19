from recommendation.models import Recommendation
from .constants import NUM_RECOMMENDATIONS

def make_recommendations(user_id, type):
    # Retrieve historical data for the user from the database
    user_history = Recommendation.objects.filter(user_id=user_id, location__type=type)
    
    # Perform recommendation logic based on user history
    
    # For simplicity, return top N recommendations based on highest confidence values
    top_recommendations = user_history.order_by('-confidence')[:NUM_RECOMMENDATIONS]
    
    return top_recommendations

    
