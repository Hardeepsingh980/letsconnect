from django.db import models
from django.db.models import Q

from django.contrib.auth import get_user_model


class Schedule(models.Model):
    date = models.DateField()
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)


class Slots(models.Model):
    MEETING_TYPES = (
        ('gmeet', 'gmeet'),
        ('zoom', 'zoom'),
    )
    from_time = models.TimeField()
    to_time = models.TimeField()
    max_people = models.IntegerField()
    description = models.TextField(null=True, blank=True)
    meeting_type = models.CharField(max_length=10, choices=MEETING_TYPES)
    is_available = models.BooleanField(default=True)

    # relationships
    schedule = models.ForeignKey(
        Schedule, on_delete=models.CASCADE, related_name='slots')
