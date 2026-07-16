from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.core.mail import send_mail
from django.conf import settings
from .models import Service, Availability, Appointment
from .serializers import ServiceSerializer, AvailabilitySerializer, AppointmentSerializer


class IsQualityStaffOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_quality_staff)


class ServiceViewSet(viewsets.ModelViewSet):
    """Prestations proposées. Lecture publique, écriture réservée au staff qualité."""
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    permission_classes = [IsQualityStaffOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']


class AvailabilityViewSet(viewsets.ModelViewSet):
    """Créneaux disponibles. Lecture publique (pour le calendrier de réservation)."""
    queryset = Availability.objects.filter(is_booked=False)
    serializer_class = AvailabilitySerializer
    permission_classes = [IsQualityStaffOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['staff', 'is_booked']


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    Création publique (le visiteur prend RDV sans forcément être connecté).
    Consultation/modification réservée au staff qualité ou au client concerné.
    """
    serializer_class = AppointmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'service', 'mode']

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Appointment.objects.none()
        if user.is_quality_staff:
            return Appointment.objects.all()
        return Appointment.objects.filter(client=user)

    def perform_create(self, serializer):
        appointment = serializer.save()
        # Confirmation automatique par e-mail (backend "console" en dev)
        send_mail(
            subject=f"Confirmation de votre demande de rendez-vous — {appointment.service.name}",
            message=(
                f"Bonjour {appointment.contact_name},\n\n"
                f"Nous avons bien reçu votre demande de rendez-vous pour "
                f"« {appointment.service.name} » le {appointment.requested_date} "
                f"à {appointment.requested_time}.\n"
                f"Notre équipe vous confirmera ce créneau sous 48h.\n\n"
                f"Cordialement,\nL'équipe Qualité"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[appointment.contact_email],
            fail_silently=True,
        )
