from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class Laboratory(models.Model):
    """Laboratoire suivi (client interne ou labo propre en usage multi-sites)."""
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=100, blank=True)
    accreditation_body = models.CharField(
        max_length=100, blank=True, help_text=_("ex: COFRAC, ISO 15189, ISO 17025")
    )
    accreditation_number = models.CharField(max_length=100, blank=True)
    accreditation_scope = models.TextField(blank=True)
    contact_email = models.EmailField(blank=True)

    def __str__(self):
        return self.name


class NonConformity(models.Model):
    """Non-conformité (pré-analytique, analytique, post-analytique)."""

    class Phase(models.TextChoices):
        PRE_ANALYTICAL = 'pre', _('Pré-analytique')
        ANALYTICAL = 'analytical', _('Analytique')
        POST_ANALYTICAL = 'post', _('Post-analytique')

    class Severity(models.TextChoices):
        LOW = 'low', _('Mineure')
        MEDIUM = 'medium', _('Majeure')
        HIGH = 'high', _('Critique')

    class Status(models.TextChoices):
        OPEN = 'open', _('Ouverte')
        INVESTIGATING = 'investigating', _("Analyse des causes en cours")
        ACTION_PLANNED = 'action_planned', _("Plan d'action défini")
        CLOSED = 'closed', _('Clôturée')

    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE, related_name='non_conformities')
    reference = models.CharField(max_length=50, unique=True, help_text=_("ex: NC-2026-001"))
    title = models.CharField(max_length=255)
    description = models.TextField()
    phase = models.CharField(max_length=15, choices=Phase.choices)
    severity = models.CharField(max_length=10, choices=Severity.choices, default=Severity.LOW)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.OPEN)

    root_cause_analysis = models.TextField(
        blank=True, help_text=_("Analyse des causes (5M, Ishikawa, 5 Pourquoi...)")
    )
    corrective_action = models.TextField(blank=True)
    preventive_action = models.TextField(blank=True)

    reported_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True,
        related_name='reported_non_conformities'
    )
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='assigned_non_conformities'
    )

    detected_at = models.DateField()
    due_date = models.DateField(null=True, blank=True)
    closed_at = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'non conformities'
        ordering = ['-detected_at']

    def __str__(self):
        return f"{self.reference} — {self.title}"


class QualityIndicator(models.Model):
    """Indicateur qualité suivi dans le temps (KPI)."""

    class Category(models.TextChoices):
        TURNAROUND_TIME = 'tat', _('Délai de rendu des résultats')
        ERROR_RATE = 'error_rate', _("Taux d'erreurs")
        SAMPLE_REJECTION = 'rejection', _("Taux de rejet d'échantillons")
        SATISFACTION = 'satisfaction', _('Satisfaction client/patient')
        OTHER = 'other', _('Autre')

    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE, related_name='indicators')
    category = models.CharField(max_length=20, choices=Category.choices)
    name = models.CharField(max_length=255)
    period_start = models.DateField()
    period_end = models.DateField()
    target_value = models.FloatField(help_text=_("Objectif à atteindre"))
    actual_value = models.FloatField(help_text=_("Valeur mesurée"))
    unit = models.CharField(max_length=30, blank=True, help_text=_("%, jours, heures..."))
    comment = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-period_end']

    @property
    def is_within_target(self):
        return self.actual_value <= self.target_value

    def __str__(self):
        return f"{self.name} ({self.period_start} → {self.period_end})"


class Audit(models.Model):
    """Audit interne ou externe."""

    class AuditType(models.TextChoices):
        INTERNAL = 'internal', _('Audit interne')
        EXTERNAL = 'external', _('Audit externe / accréditation')

    class Status(models.TextChoices):
        PLANNED = 'planned', _('Planifié')
        IN_PROGRESS = 'in_progress', _('En cours')
        COMPLETED = 'completed', _('Terminé')

    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE, related_name='audits')
    audit_type = models.CharField(max_length=10, choices=AuditType.choices)
    reference = models.CharField(max_length=50, unique=True)
    scope = models.TextField(help_text=_("Périmètre audité"))
    auditor = models.CharField(max_length=255, blank=True)
    planned_date = models.DateField()
    completed_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=15, choices=Status.choices, default=Status.PLANNED)
    findings = models.TextField(blank=True, help_text=_("Constats de l'audit"))
    action_plan = models.TextField(blank=True)

    class Meta:
        ordering = ['-planned_date']

    def __str__(self):
        return f"{self.reference} — {self.get_audit_type_display()}"


class QualityDocument(models.Model):
    """Document / procédure du système de management de la qualité (SOP)."""

    class DocType(models.TextChoices):
        PROCEDURE = 'procedure', _('Procédure')
        SOP = 'sop', _('Mode opératoire (SOP)')
        POLICY = 'policy', _('Politique qualité')
        FORM = 'form', _('Formulaire / enregistrement')
        MANUAL = 'manual', _('Manuel qualité')

    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE, related_name='documents')
    title = models.CharField(max_length=255)
    doc_type = models.CharField(max_length=15, choices=DocType.choices)
    reference = models.CharField(max_length=50, help_text=_("ex: PROC-QUAL-012"))
    version = models.CharField(max_length=20, default='1.0')
    file = models.FileField(upload_to='quality_documents/%Y/%m/', blank=True, null=True)
    is_validated = models.BooleanField(default=False)
    validated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='validated_documents'
    )
    effective_date = models.DateField(null=True, blank=True)
    next_review_date = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['reference']
        unique_together = ('laboratory', 'reference', 'version')

    def __str__(self):
        return f"{self.reference} v{self.version} — {self.title}"


class Equipment(models.Model):
    """Équipement de laboratoire : suivi calibration / maintenance."""
    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE, related_name='equipments')
    name = models.CharField(max_length=255)
    serial_number = models.CharField(max_length=100, blank=True)
    last_calibration_date = models.DateField(null=True, blank=True)
    next_calibration_date = models.DateField(null=True, blank=True)
    last_maintenance_date = models.DateField(null=True, blank=True)
    next_maintenance_date = models.DateField(null=True, blank=True)
    is_operational = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class InternalQualityControl(models.Model):
    """CIQ - Contrôle interne qualité quotidien (suivi type Levey-Jennings)."""
    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE, related_name='internal_controls')
    equipment = models.ForeignKey(Equipment, on_delete=models.SET_NULL, null=True, blank=True)
    analyte = models.CharField(max_length=255, help_text=_("Paramètre analysé"))
    control_level = models.CharField(max_length=50, help_text=_("ex: Niveau 1, 2, 3"))
    date = models.DateField()
    measured_value = models.FloatField()
    target_mean = models.FloatField()
    standard_deviation = models.FloatField()
    is_within_limits = models.BooleanField(default=True)
    comment = models.TextField(blank=True)

    class Meta:
        ordering = ['-date']
        verbose_name = "Contrôle interne qualité (CIQ)"
        verbose_name_plural = "Contrôles internes qualité (CIQ)"

    def __str__(self):
        return f"{self.analyte} — {self.date}"


class ExternalQualityAssessment(models.Model):
    """EEQ / CEQ - Évaluation externe de la qualité."""
    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE, related_name='external_assessments')
    provider = models.CharField(max_length=255, help_text=_("Organisme fournisseur EEQ"))
    analyte = models.CharField(max_length=255)
    round_reference = models.CharField(max_length=100, help_text=_("Référence de la campagne"))
    date_received = models.DateField()
    result_value = models.FloatField(null=True, blank=True)
    target_value = models.FloatField(null=True, blank=True)
    deviation_score = models.FloatField(null=True, blank=True, help_text=_("Z-score ou équivalent"))
    is_satisfactory = models.BooleanField(default=True)
    corrective_action = models.TextField(blank=True)

    class Meta:
        verbose_name = "Évaluation externe de la qualité (EEQ)"
        verbose_name_plural = "Évaluations externes de la qualité (EEQ)"
        ordering = ['-date_received']

    def __str__(self):
        return f"{self.analyte} — {self.round_reference}"


class TrainingRecord(models.Model):
    """Suivi des formations et habilitations du personnel."""
    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE, related_name='training_records')
    employee = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='trainings')
    title = models.CharField(max_length=255)
    training_date = models.DateField()
    expiry_date = models.DateField(null=True, blank=True)
    is_qualified = models.BooleanField(default=True)
    certificate = models.FileField(upload_to='training_certificates/%Y/%m/', blank=True, null=True)

    def __str__(self):
        return f"{self.employee} — {self.title}"


class Complaint(models.Model):
    """Réclamation patient / client."""

    class Status(models.TextChoices):
        OPEN = 'open', _('Ouverte')
        UNDER_REVIEW = 'under_review', _("En cours de traitement")
        CLOSED = 'closed', _('Clôturée')

    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE, related_name='complaints')
    reference = models.CharField(max_length=50, unique=True)
    complainant_name = models.CharField(max_length=255)
    complainant_email = models.EmailField(blank=True)
    description = models.TextField()
    received_date = models.DateField()
    status = models.CharField(max_length=15, choices=Status.choices, default=Status.OPEN)
    resolution = models.TextField(blank=True)
    closed_date = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['-received_date']

    def __str__(self):
        return f"{self.reference} — {self.complainant_name}"


class ManagementReview(models.Model):
    """Revue de direction annuelle : synthèse des indicateurs qualité."""
    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE, related_name='management_reviews')
    review_date = models.DateField()
    period_covered = models.CharField(max_length=100, help_text=_("ex: Année 2025"))
    summary = models.TextField()
    decisions = models.TextField(blank=True)
    attendees = models.TextField(blank=True)

    class Meta:
        ordering = ['-review_date']

    def __str__(self):
        return f"Revue de direction — {self.period_covered}"
