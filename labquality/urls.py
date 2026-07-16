"""labquality URL Configuration."""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns

urlpatterns = [
    path('admin/', admin.site.urls),

    # API REST (v1) - usage international, consommable par n'importe quel front (web/mobile)
    path('api/v1/auth/', include('accounts.urls')),
    path('api/v1/', include('appointments.urls')),
    path('api/v1/quality/', include('quality.urls')),
    path('api-auth/', include('rest_framework.urls')),  # login browsable API
    path('i18n/', include('django.conf.urls.i18n')),  # sélecteur de langue (set_language)
]

# Site public multilingue (préfixe /fr/, /en/...)
urlpatterns += i18n_patterns(
    path('', include('core.urls')),
    prefix_default_language=True,
)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
