from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.home, name='home'),
    path('services/', views.services, name='services'),
    path('a-propos/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('rendez-vous/', views.book_appointment, name='book_appointment'),
    path('tableau-de-bord/', views.dashboard, name='dashboard'),
    path('espace-client/', views.client_space, name='client_space'),
    path('connexion/', auth_views.LoginView.as_view(template_name='core/login.html'), name='login'),
    path('deconnexion/', auth_views.LogoutView.as_view(next_page='core:home'), name='logout'),
]
