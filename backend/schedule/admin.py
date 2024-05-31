from django.contrib import admin

# Register your models here.
from .models import (
    Schedule,
    Slots
)

admin.site.register((Schedule, Slots))