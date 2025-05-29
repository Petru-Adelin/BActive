from django.urls import path
from . import views

urlpatterns = [
    path('', views.weekly, name="StatsHome"),
    path('yearly/', views.yearly, name='StatsYearly')
]