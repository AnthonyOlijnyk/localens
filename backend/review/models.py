from django.db import models

class Review(models.Model):
    text = models.TextField()

    location = models.ForeignKey('location.Location', on_delete=models.CASCADE, null=True)

