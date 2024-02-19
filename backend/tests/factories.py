import factory

import datetime

from user.models import User
from review.models import Review
from location.models import Location
from recommendation.models import Recommendation

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


class LocationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Location

        skip_postgeneration_save = True

    type = 'Hotel'

    name = 'Chelsea Hotel, Toronto'
    about = 'This is a hotel'
    average_rating = 4.2
    latitude = 43.6586549948449
    longitude = -79.3830784676364
    is_family_friendly = True
    average_cost = 172
    start_time = datetime.time(10, 30, 0)
    end_time = datetime.time(18, 30, 0)

    @factory.post_generation
    def post_save(self, create, extracted, **kwargs):
        self.save()

class ReviewFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Review

        skip_postgeneration_save = True

    text = 'this is a review'
    location = factory.SubFactory(LocationFactory)

    @factory.post_generation
    def post_save(self, create, extracted, **kwargs):
        self.save()

class RecommendationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Recommendation

        skip_postgeneration_save = True

    confidence = 0.05
    user = factory.SubFactory(UserFactory)
    location = factory.SubFactory(LocationFactory)

    @factory.post_generation
    def post_save(self, create, extracted, **kwargs):
        self.save()
