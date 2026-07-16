from rest_framework.routers import DefaultRouter
from .views import (
    LaboratoryViewSet, NonConformityViewSet, QualityIndicatorViewSet,
    AuditViewSet, QualityDocumentViewSet, EquipmentViewSet,
    InternalQualityControlViewSet, ExternalQualityAssessmentViewSet,
    TrainingRecordViewSet, ComplaintViewSet, ManagementReviewViewSet,
)

app_name = 'quality'

router = DefaultRouter()
router.register('laboratories', LaboratoryViewSet, basename='laboratory')
router.register('non-conformities', NonConformityViewSet, basename='nonconformity')
router.register('indicators', QualityIndicatorViewSet, basename='indicator')
router.register('audits', AuditViewSet, basename='audit')
router.register('documents', QualityDocumentViewSet, basename='document')
router.register('equipments', EquipmentViewSet, basename='equipment')
router.register('internal-controls', InternalQualityControlViewSet, basename='iqc')
router.register('external-assessments', ExternalQualityAssessmentViewSet, basename='eqa')
router.register('trainings', TrainingRecordViewSet, basename='training')
router.register('complaints', ComplaintViewSet, basename='complaint')
router.register('management-reviews', ManagementReviewViewSet, basename='managementreview')

urlpatterns = router.urls
