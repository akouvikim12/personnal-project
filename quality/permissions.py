from rest_framework import permissions


class IsQualityStaff(permissions.BasePermission):
    """Accès réservé au personnel qualité (admin / quality_staff) - module 100% interne."""

    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and user.is_quality_staff)
