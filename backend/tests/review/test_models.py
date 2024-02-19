import pytest

@pytest.mark.django_db
def test_attributes_set(review_factory):
    review = review_factory()
    
    assert review.text == 'this is a review'
    assert review.location.name == 'Chelsea Hotel, Toronto'