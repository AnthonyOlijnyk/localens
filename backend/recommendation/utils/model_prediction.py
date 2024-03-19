import pandas as pd
import pickle

from recommendation.constants import MODEL_PATH, TYPE_MAP

def format_prediction_params(data):
    data_dict =  {
        'Type': TYPE_MAP[data['type']],
        'Average rating': data['average_rating'],
        'Latitude': data['latitude'],
        'Longitude': data['longitude'],
        'Family Friendly': data['family_friendly'],
        'Cost': data['cost'],
        'Operating hours: Opening time': data['open_time'],
        'Operating hours: Closing time': data['close_time'],
        'Accessibility rating': data['accessibility_rating'],
        'Capacity': data['capacity']
    }

    return pd.DataFrame(data_dict, index=[0])

def predict(raw_request_data):
    prediction_params = format_prediction_params(raw_request_data)

    with open(MODEL_PATH, 'rb') as file:  
        model = pickle.load(file)

    return model.predict_proba(prediction_params)[0]