from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'role', 'organization', 'country', 'is_active')
    list_filter = ('role', 'is_active', 'country')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Informations laboratoire', {
            'fields': ('role', 'phone', 'organization', 'country', 'preferred_language')
        }),
    )
