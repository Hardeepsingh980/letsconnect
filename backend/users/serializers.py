import json
from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
    StringRelatedField
)

from allauth.socialaccount.models import SocialAccount
from django.contrib.auth import get_user_model

User = get_user_model()


class SocialAccountSerializer(ModelSerializer):
    class Meta:
        model = SocialAccount
        fields = ('id', 'extra_data')


class UserProfileSerializer(ModelSerializer):
    social = SerializerMethodField()
    profile_url = StringRelatedField(source='profile.profile_url')

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'profile_url',
            'social'
        )
    
    def get_social(self, obj):
        social = obj.socialaccount_set.first()
        data = {}
        if social:
            data = social.extra_data
        return data
