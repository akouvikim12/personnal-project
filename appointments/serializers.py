from rest_framework import serializers
from .models import Service, Availability, Appointment


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ('id', 'staff', 'start', 'end', 'is_booked')
        read_only_fields = ('is_booked',)


class AppointmentSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.name', read_only=True)

    class Meta:
        model = Appointment
        fields = (
            'id', 'client', 'contact_name', 'contact_email', 'contact_phone',
            'laboratory_name', 'country', 'service', 'service_name', 'availability',
            'requested_date', 'requested_time', 'mode', 'message', 'status',
            'created_at', 'updated_at',
        )
        read_only_fields = ('id', 'client', 'status', 'created_at', 'updated_at')

    def create(self, validated_data):
        request = self.context.get('request')
        if request and request.user and request.user.is_authenticated:
            validated_data['client'] = request.user
        appointment = super().create(validated_data)
        availability = appointment.availability
        if availability:
            availability.is_booked = True
            availability.save(update_fields=['is_booked'])
        return appointment
