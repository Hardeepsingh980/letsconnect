from django.db import models

from django.contrib.auth import get_user_model

User = get_user_model()


class UserProfile(models.Model):
    profile_url = models.CharField(max_length=100, unique=True)

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
