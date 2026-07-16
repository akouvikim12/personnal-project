from django.contrib import admin
from .models import (
    Laboratory, NonConformity, QualityIndicator, Audit, QualityDocument,
    Equipment, InternalQualityControl, ExternalQualityAssessment,
    TrainingRecord, Complaint, ManagementReview,
)


@admin.register(Laboratory)
class LaboratoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'accreditation_body', 'accreditation_number')
    search_fields = ('name',)


@admin.register(NonConformity)
class NonConformityAdmin(admin.ModelAdmin):
    list_display = ('reference', 'laboratory', 'phase', 'severity', 'status', 'detected_at', 'due_date')
    list_filter = ('phase', 'severity', 'status', 'laboratory')
    search_fields = ('reference', 'title')
    date_hierarchy = 'detected_at'


@admin.register(QualityIndicator)
class QualityIndicatorAdmin(admin.ModelAdmin):
    list_display = ('name', 'laboratory', 'category', 'period_start', 'period_end', 'target_value', 'actual_value', 'is_within_target')
    list_filter = ('category', 'laboratory')


@admin.register(Audit)
class AuditAdmin(admin.ModelAdmin):
    list_display = ('reference', 'laboratory', 'audit_type', 'planned_date', 'status')
    list_filter = ('audit_type', 'status', 'laboratory')


@admin.register(QualityDocument)
class QualityDocumentAdmin(admin.ModelAdmin):
    list_display = ('reference', 'title', 'doc_type', 'version', 'is_validated', 'next_review_date')
    list_filter = ('doc_type', 'is_validated', 'laboratory')
    search_fields = ('title', 'reference')


@admin.register(Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'laboratory', 'next_calibration_date', 'next_maintenance_date', 'is_operational')
    list_filter = ('laboratory', 'is_operational')


@admin.register(InternalQualityControl)
class InternalQualityControlAdmin(admin.ModelAdmin):
    list_display = ('analyte', 'laboratory', 'date', 'measured_value', 'target_mean', 'is_within_limits')
    list_filter = ('laboratory', 'is_within_limits')
    date_hierarchy = 'date'


@admin.register(ExternalQualityAssessment)
class ExternalQualityAssessmentAdmin(admin.ModelAdmin):
    list_display = ('analyte', 'laboratory', 'provider', 'round_reference', 'is_satisfactory')
    list_filter = ('laboratory', 'is_satisfactory')


@admin.register(TrainingRecord)
class TrainingRecordAdmin(admin.ModelAdmin):
    list_display = ('employee', 'title', 'laboratory', 'training_date', 'expiry_date', 'is_qualified')
    list_filter = ('laboratory', 'is_qualified')


@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = ('reference', 'laboratory', 'complainant_name', 'received_date', 'status')
    list_filter = ('laboratory', 'status')


@admin.register(ManagementReview)
class ManagementReviewAdmin(admin.ModelAdmin):
    list_display = ('period_covered', 'laboratory', 'review_date')
    list_filter = ('laboratory',)
