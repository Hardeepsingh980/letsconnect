from django_filters.rest_framework import DjangoFilterBackend
# rest framework
from rest_framework.viewsets import (
    GenericViewSet    
)
from rest_framework.mixins import (
    ListModelMixin,
    UpdateModelMixin,
    DestroyModelMixin
)
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

# models imports
from .models import (
    Schedule,
    Slots
)

# serializers imports
from .serializers import (
    ScheduleSerializer,
    ScheduleAddSerializer,
    SlotSerializer
)


class ScheduleViewSet(ListModelMixin, GenericViewSet):
    serializer_class = ScheduleSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'date': ['lte', 'gte']
    }

    def get_queryset(self):
        return Schedule.objects.prefetch_related('slots').filter(user=self.request.user)

    @action(methods=['post'], detail=False, serializer_class=ScheduleAddSerializer)
    def add(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)


class SlotsViewSet(DestroyModelMixin, GenericViewSet):
    serializer_class = SlotSerializer

    def get_queryset(self):
        return Slots.objects.filter(schedule__user=self.request.user)
