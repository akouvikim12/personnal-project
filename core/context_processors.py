def site_settings(request):
    """Variables disponibles dans tous les templates (nom du labo, coordonnées...)."""
    return {
        'SITE_NAME': "LabQuality Conseil",
        'SITE_TAGLINE': "Accompagnement et suivi qualité pour les laboratoires",
        'SITE_EMAIL': "contact@labquality.example",
        'SITE_PHONE': "+33 1 23 45 67 89",
    }
