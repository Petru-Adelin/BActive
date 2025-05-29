from . import views
from django.urls import path

urlpatterns = [
    path('login/', views.login, name='Login'),
    path('signin/', views.signin, name='SingIn'),
    path('csrf/', views.aquire_csrf, name='aquire csrf'),
    path('filter/', views.filter_user),
    path('delete/', views.delete_user),
    path('decry/', views.decry)
]