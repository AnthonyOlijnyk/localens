import pytest

@pytest.mark.django_db
def test_attributes_set(user_factory):
    user = user_factory()
    
    assert user.email == 'test@example.com'
    assert user.password == 'password123!'
    assert user.username == 'testname'
    assert user.__str__() == 'testname'