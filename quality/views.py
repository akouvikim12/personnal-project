from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .permissions import IsQualityStaff
from .models import (
    Laboratory, NonConformity, QualityIndicator, Audit, QualityDocument,
    Equipment, InternalQualityControl, ExternalQualityAssessment,
    TrainingRecord, Complaint, ManagementReview,
)
from .serializers import (
    LaboratorySerializer, NonConformitySerializer, QualityIndicatorSerializer,
    AuditSerializer, QualityDocumentSerializer, EquipmentSerializer,
    InternalQualityControlSerializer, ExternalQualityAssessmentSerializer,
    TrainingRecordSerializer, ComplaintSerializer, ManagementReviewSerializer,
)


class BaseQualityViewSet(viewsets.ModelViewSet):
    """Tous les modules qualité sont réservés au personnel qualité authentifié."""
    permission_classes = [IsQualityStaff]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]


class LaboratoryViewSet(BaseQualityViewSet):
    queryset = Laboratory.objects.all()
    serializer_class = LaboratorySerializer
    search_fields = ['name', 'country']


class NonConformityViewSet(BaseQualityViewSet):
    queryset = NonConformity.objects.all()
    serializer_class = NonConformitySerializer
    filterset_fields = ['laboratory', 'phase', 'severity', 'status']
    search_fields = ['reference', 'title', 'description']

    def perform_create(self, serializer):
        serializer.save(reported_by=self.request.user)


class QualityIndicatorViewSet(BaseQualityViewSet):
    queryset = QualityIndicator.objects.all()
    serializer_class = QualityIndicatorSerializer
    filterset_fields = ['laboratory', 'category']


class AuditViewSet(BaseQualityViewSet):
    queryset = Audit.objects.all()
    serializer_class = AuditSerializer
    filterset_fields = ['laboratory', 'audit_type', 'status']


class QualityDocumentViewSet(BaseQualityViewSet):
    queryset = QualityDocument.objects.all()
    serializer_class = QualityDocumentSerializer
    filterset_fields = ['laboratory', 'doc_type', 'is_validated']
    search_fields = ['title', 'reference']


class EquipmentViewSet(BaseQualityViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    filterset_fields = ['laboratory', 'is_operational']


class InternalQualityControlViewSet(BaseQualityViewSet):
    queryset = InternalQualityControl.objects.all()
    serializer_class = InternalQualityControlSerializer
    filterset_fields = ['laboratory', 'equipment', 'is_within_limits']


class ExternalQualityAssessmentViewSet(BaseQualityViewSet):
    queryset = ExternalQualityAssessment.objects.all()
    serializer_class = ExternalQualityAssessmentSerializer
    filterset_fields = ['laboratory', 'is_satisfactory']


class TrainingRecordViewSet(BaseQualityViewSet):
    queryset = TrainingRecord.objects.all()
    serializer_class = TrainingRecordSerializer
    filterset_fields = ['laboratory', 'employee', 'is_qualified']


class ComplaintViewSet(BaseQualityViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    filterset_fields = ['laboratory', 'status']


class ManagementReviewViewSet(BaseQualityViewSet):
    queryset = ManagementReview.objects.all()
    serializer_class = ManagementReviewSerializer
    filterset_fields = ['laboratory']
