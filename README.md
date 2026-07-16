# LabQuality — Site vitrine, prise de rendez-vous & suivi qualité laboratoire

Site Django + API REST pour un cabinet d'accompagnement qualité destiné aux
laboratoires de biologie médicale : présentation des services, prise de
rendez-vous en ligne, et outil interne de suivi de l'assurance qualité
(ISO 15189 / ISO 17025).

## Stack technique

- **Backend** : Django 6 + Django REST Framework (API JSON complète)
- **Auth API** : JWT (djangorestframework-simplejwt)
- **Base de données** : SQLite en développement, PostgreSQL recommandé en production
- **i18n** : FR / EN (extensible à d'autres langues — usage international)
- **CORS** : django-cors-headers (pour consommer l'API depuis un front séparé : React, mobile, etc.)

## Structure du projet

```
labquality/
├── labquality/       # settings, urls racine
├── accounts/         # utilisateurs + rôles (admin / quality_staff / client), JWT
├── core/              # site vitrine public (accueil, services, à propos, contact, tableau de bord)
├── appointments/      # services proposés, créneaux, rendez-vous
├── quality/           # module d'assurance qualité (interne, protégé)
├── templates/core/    # templates HTML du site public
├── static/css/        # feuille de style
└── requirements.txt
```

## Modules qualité inclus (`quality` app)

Basés sur les exigences classiques ISO 15189 :

- **Laboratoires** (multi-sites / multi-clients)
- **Non-conformités** : phase (pré/analytique/post), gravité, analyse des causes, actions correctives/préventives, statut
- **Indicateurs qualité (KPI)** : délais de rendu, taux d'erreurs, taux de rejet, satisfaction
- **Audits internes/externes** : planification, constats, plan d'action
- **Documents qualité (SOP)** : versioning, validation, dates de révision
- **Équipements** : calibration, maintenance
- **CIQ** (contrôle interne qualité quotidien)
- **EEQ/CEQ** (évaluation externe de la qualité)
- **Formations / habilitations du personnel**
- **Réclamations patients/clients**
- **Revue de direction**

Tout ce module est accessible via l'admin Django (`/admin/`) **et** via l'API
REST (`/api/v1/quality/...`), réservé au personnel qualité authentifié
(rôle `admin` ou `quality_staff`).

## Installation

```bash
python -m venv venv
source venv/bin/activate  # Windows : venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env      # puis adapter les valeurs
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Un compte de démonstration a été préparé via `seed_demo_data.py` :
- **Admin** : `admin` / `Admin1234!` (⚠️ à changer immédiatement)
- 6 services de démonstration
- 1 laboratoire de démonstration

Pour recharger ces données de test :
```bash
python manage.py shell < seed_demo_data.py
```

## Pages du site public

| URL | Description |
|---|---|
| `/fr/` ou `/en/` | Accueil |
| `/fr/services/` | Liste des prestations |
| `/fr/a-propos/` | Présentation, expertise |
| `/fr/contact/` | Formulaire de contact |
| `/fr/rendez-vous/` | Prise de rendez-vous (formulaire complet) |
| `/fr/connexion/` | Connexion |
| `/fr/tableau-de-bord/` | Tableau de bord qualité (staff uniquement) |
| `/fr/espace-client/` | Espace client (suivi de ses rendez-vous) |
| `/admin/` | Back-office Django complet (gestion fine de tous les modules) |

## API REST

Toutes les routes sont préfixées par `/api/v1/`.

### Authentification
- `POST /api/v1/auth/register/` — inscription client (laboratoire)
- `POST /api/v1/auth/token/` — obtenir un token JWT (login)
- `POST /api/v1/auth/token/refresh/`
- `GET/PATCH /api/v1/auth/me/` — profil de l'utilisateur connecté

### Rendez-vous (public en lecture / création)
- `GET /api/v1/services/` — liste des prestations
- `GET /api/v1/availabilities/` — créneaux disponibles
- `POST /api/v1/appointments/` — prise de rendez-vous (pas besoin d'être connecté)
- `GET /api/v1/appointments/` — historique (connecté : ses propres RDV, ou tous si staff qualité)

### Qualité (réservé au personnel qualité authentifié)
- `/api/v1/quality/laboratories/`
- `/api/v1/quality/non-conformities/`
- `/api/v1/quality/indicators/`
- `/api/v1/quality/audits/`
- `/api/v1/quality/documents/`
- `/api/v1/quality/equipments/`
- `/api/v1/quality/internal-controls/` (CIQ)
- `/api/v1/quality/external-assessments/` (EEQ)
- `/api/v1/quality/trainings/`
- `/api/v1/quality/complaints/`
- `/api/v1/quality/management-reviews/`

Toutes ces routes supportent le filtrage, la recherche et la pagination
standard DRF (`?search=...`, `?laboratory=1`, `?page=2`, etc.).

Authentification via header : `Authorization: Bearer <access_token>`.

## Passer en production (usage international)

1. **Base de données** : passer à PostgreSQL (`DATABASES` dans `settings.py`, via `DATABASE_URL`)
2. **`DEBUG=False`**, définir `DJANGO_ALLOWED_HOSTS` et `CORS_ALLOWED_ORIGINS`
3. **HTTPS obligatoire** : configurer un reverse proxy (nginx) + certificat SSL (Let's Encrypt)
4. **Emails** : configurer un vrai `EMAIL_BACKEND` SMTP (SendGrid, Mailgun, AWS SES...)
5. **Fichiers statiques/médias** : `collectstatic` + stockage S3/Cloud Storage recommandé pour les documents qualité
6. **Langues supplémentaires** : ajouter dans `LANGUAGES` (settings.py) puis `python manage.py makemessages -l <code>`
7. **Sauvegardes** : mettre en place des sauvegardes automatiques de la base (documents qualité = données sensibles/réglementaires)
8. **RGPD / confidentialité** : ajouter une page de politique de confidentialité (mentionnée mais à rédiger avec un juriste)

## Prochaines étapes possibles (phase 2)

- Espace client enrichi : téléversement de documents, suivi d'avancement des audits, comptes rendus
- Calendrier interactif (FullCalendar.js) branché sur `/api/v1/availabilities/`
- Notifications automatiques (rappels de RDV, échéances de documents/calibration à venir)
- Export PDF/Excel des rapports qualité pour les audits
- Tableaux de bord graphiques (Chart.js) pour les indicateurs qualité et CIQ (cartes de Levey-Jennings)
