import pytest

from django.urls import reverse

from user.models import User
from user.utils.login import create_token

@pytest.mark.parametrize(
   'email, password, username, num_total_users, status_code, errors', [
       ('email@example.com', 'password123!', 'name', 2, 201, None),
       ('email.in.use@example.com', 'password1234!', 'name', 1, 400, {
           'email': [
               'user with this email already exists.'
           ]
       }),
       ('good@example.com', 'password12345!', 'username_in_use', 1, 400, {
           'username': [
               'user with this username already exists.'
           ]
       }),
       ('email.in.use@example.com', 'passwor!', 'username_in_use', 1, 400, {
           'username': [
               'user with this username already exists.'
           ],
           'email': [
               'user with this email already exists.'
           ]
       }),
   ]
)
@pytest.mark.django_db
def test_signup(
    email,
    password,
    username,
    num_total_users,
    status_code,
    errors,
    user_factory,
    api_client
):
    user = user_factory(
        email='email.in.use@example.com',
        username='username_in_use'
    )

    url = reverse('signup')

    data = {
        'email': email,
        'password': password,
        'username': username
    }

    response = api_client.post(url, data=data)

    assert response.status_code == status_code

    if errors:
        assert response.data['errors'] == errors
    assert User.objects.count() == num_total_users

@pytest.mark.parametrize(
   'email, password, status_code, errors', [
       ('correct.email@example.com', 'correct.password', 201, None),
       ('incorrect.email@example.com', 'correct.password', 400, {
           'email': [
              'There are no users with the specified email address.' 
           ]
       }),
       ('correct.email@example.com', 'incorrect.password', 400, {
           'password': [
              'Incorrect password for the specified user.' 
           ]
        }),
   ]
)
@pytest.mark.django_db
def test_login(
    email,
    password,
    status_code,
    errors,
    user_factory,
    api_client
):

    user_factory(
        email='correct.email@example.com',
        password='correct.password'
    )

    url = reverse('login')

    data = {
        'email': email,
        'password': password,
    }

    response = api_client.post(url, data=data)

    assert response.status_code == status_code

    if errors:
        assert response.data['errors'] == errors
        