from django.db import models
from django.utils import timezone

class Location(models.Model):

    class AttractionType(models.TextChoices):
        RESTAURANT = 'Restaurant'
        HOTEL = 'Hotel'
        ACTIVITY = 'Activity'

    type = models.CharField(
        max_length=10,
        choices=AttractionType.choices,
    )

    name = models.CharField(max_length=255)
    about = models.TextField()
    average_rating = models.DecimalField(max_digits=2, decimal_places=1)
    latitude = models.DecimalField(max_digits=15, decimal_places=13)
    longitude = models.DecimalField(max_digits=15, decimal_places=13)
    is_family_friendly = models.BooleanField()
    average_cost = models.DecimalField(max_digits=12, decimal_places=2)
    start_time = models.TimeField(default=timezone.now)
    end_time = models.TimeField(default=timezone.now)
