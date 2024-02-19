import pytest

from pytest_factoryboy import register

from tests.factories import (
   UserFactory,
   LocationFactory,
   ReviewFactory,
   RecommendationFactory
)

register(UserFactory)
register(LocationFactory)
register(ReviewFactory)
register(RecommendationFactory)

@pytest.fixture
def api_client():
   from rest_framework.test import APIClient
   return APIClient()
