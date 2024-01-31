import pytest

from django.urls import reverse

# @pytest.mark.parametrize(
#    'email, password, status_code', [
#        (None, None, 400),
#        (None, 'strong_pass', 400),
#        ('user@example.com', None, 400),
#        ('user@example.com', 'invalid_pass', 400),
#        ('user@example.com, 'strong_pass', 201),
#    ]
# )
@pytest.mark.django_db
def test_expected_signup_works(api_client):
    url = reverse('signup')

    data = {
        'email': 'email@example.com',
        'password': 'password123!',
        'username': 'name'
    }

    response = api_client.post(url, data=data)

    assert response.status_code == 201
        