from django.contrib import admin
from .models import Service, Availability, Appointment


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'duration_minutes', 'price', 'price_on_quote', 'is_active', 'order')
    list_editable = ('order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Availability)
class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ('staff', 'start', 'end', 'is_booked')
    list_filter = ('staff', 'is_booked')


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        'contact_name', 'laboratory_name', 'service', 'requested_date',
        'requested_time', 'mode', 'status',
    )
    list_filter = ('status', 'mode', 'service')
    search_fields = ('contact_name', 'contact_email', 'laboratory_name')
    list_editable = ()
    actions = ['mark_confirmed', 'mark_completed', 'mark_cancelled']

    def mark_confirmed(self, request, queryset):
        queryset.update(status='confirmed')
    mark_confirmed.short_description = "Marquer comme confirmé"

    def mark_completed(self, request, queryset):
        queryset.update(status='completed')
    mark_completed.short_description = "Marquer comme terminé"

    def mark_cancelled(self, request, queryset):
        queryset.update(status='cancelled')
    mark_cancelled.short_description = "Marquer comme annulé"
