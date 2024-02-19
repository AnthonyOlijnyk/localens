import pytest

@pytest.mark.django_db
def test_attributes_set(recommendation_factory):
    recommendation = recommendation_factory()
    
    assert recommendation.confidence == 0.05
    assert recommendation.user.username == 'testname'
    assert recommendation.location.name == 'Chelsea Hotel, Toronto'