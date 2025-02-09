# contacts/models.py
from django.db import models

# Create your models here.
MAX_LENGTH =255
class Contact(models.Model):
    image = models.TextField()
    name = models.CharField(max_length=MAX_LENGTH)
    address = models.CharField(max_length=MAX_LENGTH)
    phone_number = models.CharField(max_length=MAX_LENGTH)

    def __str__(self):
        return self.name
