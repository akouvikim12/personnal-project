from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """Utilisateur avec rôle : détermine les droits d'accès au site."""

    class Role(models.TextChoices):
        ADMIN = 'admin', _('Administrateur')
        QUALITY_STAFF = 'quality_staff', _('Responsable / technicien qualité')
        CLIENT = 'client', _('Client / laboratoire')

    role = models.CharField(
        max_length=20, choices=Role.choices, default=Role.CLIENT,
        help_text=_("Détermine les droits d'accès (back-office qualité vs espace client).")
    )
    phone = models.CharField(max_length=30, blank=True)
    organization = models.CharField(
        max_length=255, blank=True,
        help_text=_("Nom du laboratoire / de l'entreprise cliente.")
    )
    country = models.CharField(max_length=100, blank=True)
    preferred_language = models.CharField(max_length=10, default='fr')

    @property
    def is_quality_staff(self):
        return self.role in (self.Role.ADMIN, self.Role.QUALITY_STAFF) or self.is_superuser

    def __str__(self):
        return self.get_full_name() or self.username
