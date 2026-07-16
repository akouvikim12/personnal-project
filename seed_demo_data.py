"""Script de données de démonstration. Lancer avec : python manage.py shell < seed_demo_data.py"""
import django, os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'labquality.settings')
django.setup()

from django.contrib.auth import get_user_model
from appointments.models import Service
from quality.models import Laboratory, NonConformity, Audit, QualityIndicator

User = get_user_model()

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@labquality.example', 'Admin1234!', role='admin')
    print("Superuser 'admin' créé (mot de passe: Admin1234!)")

if not Service.objects.exists():
    services = [
        ("Audit et diagnostic qualité", "audit-diagnostic-qualite",
         "Évaluation complète de votre système de management de la qualité au regard des exigences ISO 15189.",
         120, None, True),
        ("Préparation à l'accréditation", "preparation-accreditation",
         "Accompagnement pas à pas pour réussir votre accréditation ISO 15189 ou ISO 17025.",
         90, None, True),
        ("Formation du personnel", "formation-personnel",
         "Sessions de formation sur les exigences qualité, la gestion documentaire et les non-conformités.",
         180, 450.00, False),
        ("Gestion documentaire", "gestion-documentaire",
         "Mise en place et structuration de votre système documentaire qualité (procédures, SOP).",
         90, 350.00, False),
        ("Suivi des actions correctives", "suivi-actions-correctives",
         "Accompagnement dans l'analyse des causes et la mise en œuvre d'actions correctives efficaces.",
         60, 250.00, False),
        ("Amélioration continue", "amelioration-continue",
         "Mise en place d'une démarche d'amélioration continue basée sur vos indicateurs qualité.",
         90, None, True),
    ]
    for name, slug, desc, duration, price, on_quote in services:
        Service.objects.create(
            name=name, slug=slug, description=desc,
            duration_minutes=duration, price=price, price_on_quote=on_quote,
        )
    print(f"{len(services)} services créés")

if not Laboratory.objects.exists():
    lab = Laboratory.objects.create(
        name="Laboratoire Central Analyses", country="France",
        accreditation_body="COFRAC / ISO 15189", accreditation_number="1-2345",
    )
    print("Laboratoire de démonstration créé")

print("Données de démonstration prêtes.")
