import jwt, os, datetime

def create_token(user_id):
    payload = {
        'id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }

    return jwt.encode(payload, os.environ.get('JWT_SECRET_KEY'), algorithm='HS256')