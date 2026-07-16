from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class Service(models.Model):
    """Prestation proposée aux laboratoires (audit, formation, accompagnement...)."""

    name = models.CharField(max_length=200)
    name_en = models.CharField(max_length=200, blank=True, help_text="Nom en anglais")
    slug = models.SlugField(unique=True)
    description = models.TextField()
    description_en = models.TextField(blank=True)
    duration_minutes = models.PositiveIntegerField(default=60)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_on_quote = models.BooleanField(
        default=False, help_text=_("Cocher si le prix est 'sur devis'")
    )
    is_remote_available = models.BooleanField(default=True)
    is_onsite_available = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Availability(models.Model):
    """Créneau ouvert à la réservation par un membre du staff qualité."""

    staff = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name='availabilities', limit_choices_to={'role__in': ['admin', 'quality_staff']}
    )
    start = models.DateTimeField()
    end = models.DateTimeField()
    is_booked = models.BooleanField(default=False)

    class Meta:
        ordering = ['start']

    def __str__(self):
        return f"{self.staff} — {self.start:%Y-%m-%d %H:%M}"


class Appointment(models.Model):
    """Rendez-vous pris par un client (laboratoire) pour un service donné."""

    class Mode(models.TextChoices):
        ONLINE = 'online', _('En ligne / visioconférence')
        PHONE = 'phone', _('Téléphone')
        ONSITE = 'onsite', _('Sur place')

    class Status(models.TextChoices):
        PENDING = 'pending', _('En attente de confirmation')
        CONFIRMED = 'confirmed', _('Confirmé')
        CANCELLED = 'cancelled', _('Annulé')
        COMPLETED = 'completed', _('Terminé')
        RESCHEDULED = 'rescheduled', _('Reporté')

    client = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='appointments'
    )
    # Champs dupliqués pour permettre la prise de RDV sans compte (client anonyme)
    contact_name = models.CharField(max_length=200)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=30, blank=True)
    laboratory_name = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=100, blank=True)

    service = models.ForeignKey(Service, on_delete=models.PROTECT, related_name='appointments')
    availability = models.OneToOneField(
        Availability, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='appointment'
    )
    requested_date = models.DateField()
    requested_time = models.TimeField()
    mode = models.CharField(max_length=10, choices=Mode.choices, default=Mode.ONLINE)
    message = models.TextField(blank=True, help_text=_("Besoin exprimé par le client"))
    status = models.CharField(max_length=15, choices=Status.choices, default=Status.PENDING)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-requested_date', '-requested_time']

    def __str__(self):
        return f"{self.contact_name} — {self.service} — {self.requested_date}"
