from django.db import models

class Recommendation(models.Model):
    confidence = models.DecimalField(max_digits=3, decimal_places=2)

    user = models.ForeignKey('user.User', on_delete=models.CASCADE)
    location = models.ForeignKey('location.Location', on_delete=models.CASCADE)
