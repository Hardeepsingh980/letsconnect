"""lets_connect URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# views
from users.views import (
    GoogleLoginView,
    UsersViewSet
)
from schedule.views import (
    ScheduleViewSet,
    SlotsViewSet
)
from public.views import (
    OpenScheduleViewSet,
    MeetingApiView,NotifyApiView
    
)


router = DefaultRouter()

# schedule
router.register(r'schedules', ScheduleViewSet, basename='schedule')
router.register(r'slots', SlotsViewSet, basename='slots')
router.register(r'public/schedules', OpenScheduleViewSet, basename='open_slots')


# users
router.register(r'users', UsersViewSet, basename='user')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('public/schedule/', MeetingApiView.as_view(), name='meeting'),
    path('public/notify/', NotifyApiView.as_view(), name='notify'),


    # social auth
    path('dj-rest-auth/google/', GoogleLoginView.as_view(), name='google_login')
]
