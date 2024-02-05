import pytest

from user.utils.login import create_token

from core.authorization import (
    get_token, 
    decode_token,
    get_user_id,
    check_user_authorized
)

class Request:

    META = {
        'HTTP_AUTHORIZATION': None
    }

    def __init__(self, token=None):
        self.META['HTTP_AUTHORIZATION'] = f'Bearer {token}'

USER_ID = 1

token = create_token(USER_ID)

request = Request(token)

def test_get_token():
    assert get_token(request) == token

def test_decode_token():
    try:
        decode_token(token)
    except Exception:
        pytest.fail("Unexpected MyError ..")

def test_get_user_id():
    assert get_user_id(request) == USER_ID

def test_check_user_authorized():
    assert check_user_authorized(request) == None