import factory

from user.models import User

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = 'test@example.com'
    password = 'password123!'
    username = 'testname'
