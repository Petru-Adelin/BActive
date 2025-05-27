from . import views
from django.urls import path

urlpatterns = [
    path('', views.base, name='Login'),
    path('csrf/', views.aquire_csrf, name='aquire csrf'),
    path('filter/', views.filter_user),
    path('delete/', views.delete_user),
    path('decry/', views.decry)
]