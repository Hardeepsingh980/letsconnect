from datetime import timedelta

from rest_framework.serializers import (
    ModelSerializer,
    Serializer,
    DateField,
    ValidationError
)
# models imports
from .models import Schedule, Slots
from public.models import Meeting

from public.serializer import MeetingSerializer

class SlotSerializer(ModelSerializer):
    meetings = MeetingSerializer(many=True,read_only=True)
    class Meta:
        model = Slots
        fields = (
            'id',
            'from_time',
            'to_time',
            'max_people',
            'description',
            'is_available',
            'meetings'
        )


class ScheduleSerializer(ModelSerializer):
    slots = SlotSerializer(many=True)

    class Meta:
        model = Schedule
        fields = ('id', 'date', 'slots')


class ScheduleAddSerializer(Serializer):
    from_date = DateField()
    to_date = DateField()
    slots = SlotSerializer(many=True)

    def create(self, validated_data):
        from_date = validated_data.get('from_date')
        to_date = validated_data.get('to_date')
        while from_date <= to_date:
            schedule = Schedule.objects.create(
                date=from_date, user=self.context['request'].user)
            slots_data = []
            for slot in validated_data.get('slots'):
                slots_data.append(Slots(**slot, schedule=schedule))
            Slots.objects.bulk_create(slots_data)
            from_date = from_date + timedelta(days=1)
        return schedule
