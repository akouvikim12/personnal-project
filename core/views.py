from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from django.contrib import messages
from appointments.models import Service, Appointment
from quality.models import NonConformity, QualityIndicator, Audit


def home(request):
    services = Service.objects.filter(is_active=True)[:6]
    return render(request, 'core/home.html', {'services': services})


def services(request):
    services = Service.objects.filter(is_active=True)
    return render(request, 'core/services.html', {'services': services})


def about(request):
    return render(request, 'core/about.html')


def contact(request):
    if request.method == 'POST':
        messages.success(request, "Votre message a bien été envoyé. Nous vous répondrons sous 48h.")
        return redirect('core:contact')
    return render(request, 'core/contact.html')


def book_appointment(request):
    services = Service.objects.filter(is_active=True)
    if request.method == 'POST':
        Appointment.objects.create(
            contact_name=request.POST.get('contact_name'),
            contact_email=request.POST.get('contact_email'),
            contact_phone=request.POST.get('contact_phone', ''),
            laboratory_name=request.POST.get('laboratory_name', ''),
            country=request.POST.get('country', ''),
            service_id=request.POST.get('service'),
            requested_date=request.POST.get('requested_date'),
            requested_time=request.POST.get('requested_time'),
            mode=request.POST.get('mode'),
            message=request.POST.get('message', ''),
        )
        messages.success(
            request,
            "Votre demande de rendez-vous a bien été enregistrée. "
            "Une confirmation vous sera envoyée par e-mail sous 48h."
        )
        return redirect('core:book_appointment')
    return render(request, 'core/book_appointment.html', {'services': services})


@login_required
def dashboard(request):
    """Tableau de bord qualité interne — réservé au personnel qualité."""
    if not request.user.is_quality_staff:
        return redirect('core:client_space')

    context = {
        'open_nc_count': NonConformity.objects.exclude(status='closed').count(),
        'critical_nc_count': NonConformity.objects.filter(severity='high').exclude(status='closed').count(),
        'upcoming_audits': Audit.objects.filter(status='planned').order_by('planned_date')[:5],
        'recent_indicators': QualityIndicator.objects.order_by('-period_end')[:5],
        'pending_appointments': Appointment.objects.filter(status='pending').order_by('requested_date')[:5],
    }
    return render(request, 'core/dashboard.html', context)


@login_required
def client_space(request):
    """Espace client : suivi de ses propres rendez-vous / documents transmis."""
    appointments = Appointment.objects.filter(client=request.user)
    return render(request, 'core/client_space.html', {'appointments': appointments})
