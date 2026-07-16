from rest_framework import serializers
from .models import (
    Laboratory, NonConformity, QualityIndicator, Audit, QualityDocument,
    Equipment, InternalQualityControl, ExternalQualityAssessment,
    TrainingRecord, Complaint, ManagementReview,
)


class LaboratorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Laboratory
        fields = '__all__'


class NonConformitySerializer(serializers.ModelSerializer):
    class Meta:
        model = NonConformity
        fields = '__all__'
        read_only_fields = ('reported_by',)


class QualityIndicatorSerializer(serializers.ModelSerializer):
    is_within_target = serializers.BooleanField(read_only=True)

    class Meta:
        model = QualityIndicator
        fields = '__all__'


class AuditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audit
        fields = '__all__'


class QualityDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = QualityDocument
        fields = '__all__'


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'


class InternalQualityControlSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternalQualityControl
        fields = '__all__'


class ExternalQualityAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExternalQualityAssessment
        fields = '__all__'


class TrainingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingRecord
        fields = '__all__'


class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'


class ManagementReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManagementReview
        fields = '__all__'
