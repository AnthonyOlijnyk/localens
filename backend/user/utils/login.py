import jwt
import os
import datetime

def create_token(user_id):
    payload = {
        'id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }
    
    # Use a development secret if 'JWT_SECRET_KEY' is not set in the environment
    secret_key = os.environ.get('JWT_SECRET_KEY', 'secretkey')
    
    return jwt.encode(payload, secret_key, algorithm='HS256')
