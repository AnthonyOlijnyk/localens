import factory

from user.models import User

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

        skip_postgeneration_save = True

    email = 'test@example.com'
    password = factory.PostGenerationMethodCall(
        'set_password',
        'password123!'
    )
    username = 'testname'

    @factory.post_generation
    def post_save(self, create, extracted, **kwargs):
        self.save()
