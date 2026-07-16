from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet, AvailabilityViewSet, AppointmentViewSet

app_name = 'appointments'

router = DefaultRouter()
router.register('services', ServiceViewSet, basename='service')
router.register('availabilities', AvailabilityViewSet, basename='availability')
router.register('appointments', AppointmentViewSet, basename='appointment')

urlpatterns = router.urls
