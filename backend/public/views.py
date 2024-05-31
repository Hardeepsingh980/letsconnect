from datetime import datetime, timezone
from uuid import uuid4
from django_filters.rest_framework import DjangoFilterBackend
# rest framework
from rest_framework.viewsets import (
    GenericViewSet
)
from rest_framework.mixins import (
    RetrieveModelMixin
)

from rest_framework.generics import (
    CreateAPIView,
)

from rest_framework.permissions import (
    AllowAny,
)

from rest_framework.response import Response


# models imports
from users.models import (
    UserProfile,
)
from schedule.models import (
    Schedule,
    Slots
)

# serializers imports
from schedule.serializers import (
    ScheduleSerializer,
)
from .serializer import (
    MeetingSerializer,
    NotifySerializer,
)
from .models import (
    Meeting,
)

# tasks
from schedule.tasks import (
    create_event,
    update_event
)


class OpenScheduleViewSet(RetrieveModelMixin, GenericViewSet):
    serializer_class = ScheduleSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'date': ['lte', 'gte']
    }
    lookup_field = 'profile_url'
    permission_classes = [AllowAny]

    def retrieve(self, request, *args, **kwargs):
        profile_url = kwargs.get('profile_url')
        profile = UserProfile.objects.filter(profile_url=profile_url)
        if not profile.exists():
            return Response(status=404)

        profile = profile.first()
        queryset = Schedule.objects.filter(user=profile.user)
        queryset = self.filter_queryset(queryset)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class MeetingApiView(CreateAPIView):
    serializer_class = MeetingSerializer
    permission_classes = [AllowAny]


    def post(self, request):
        serializer = MeetingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        meeting =  Meeting.objects.filter(slot=request.data['slot'])
        if meeting:
            event_id = meeting.first().event_id
            update_event(event_id,request.data['email'])
            
        else:
            slot = Slots.objects.get(id=request.data['slot'])
            schedule = slot.schedule
            # event_id = create_event(
            #     serializer.validated_data['notes'],
            #     datetime.combine(
            #         schedule.date, slot.from_time).isoformat() + "+05:30",
            #     datetime.combine(
            #         schedule.date, slot.to_time).isoformat() + "+05:30",
            #     [serializer.validated_data['email']]
            # )
            event_id = uuid4().hex
        meeting = serializer.save(event_id=event_id)
        serializer.update_slot_available_status(meeting.slot)

        return Response(serializer.data)




class NotifyApiView(CreateAPIView):
    serializer_class = NotifySerializer
    permission_classes = [AllowAny]
