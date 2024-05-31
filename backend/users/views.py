from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

# rest framework
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

# models
from django.contrib.auth import get_user_model
from .models import UserProfile

# serializers
from .serializers import UserProfileSerializer

User = get_user_model()


class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client


class UsersViewSet(GenericViewSet):

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    @action(methods=['get'], detail=False)
    def me(self, request):
        user = UserProfileSerializer(self.request.user)
        return Response(user.data)

    @action(methods=['post'], detail=False)
    def set_profile_url(self, request):
        user_profile = UserProfile.objects.filter(user=request.user)
        if user_profile:
            user_profile = user_profile.first()
        else:
            user_profile = UserProfile(user=request.user)
        user_profile.profile_url = request.data.get('profile_url', '')
        user_profile.save()
        return Response(UserProfileSerializer(request.user).data)