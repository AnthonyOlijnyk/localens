import pytest

import datetime

@pytest.mark.django_db
def test_attributes_set(location_factory):
    location = location_factory()
    
    assert location.type == 'Hotel'
    assert location.name == 'Chelsea Hotel, Toronto'
    assert location.about == 'This is a hotel'
    assert location.average_rating == 4.2
    assert location.latitude == 43.6586549948449
    assert location.longitude == -79.3830784676364
    assert location.is_family_friendly == True
    assert location.average_cost == 172
    assert location.start_time == datetime.time(10, 30, 0)
    assert location.end_time == datetime.time(18, 30, 0)