from django.urls import path
from . import views

urlpatterns = [
    path('test-payment/', views.test_payment, name='test_payment'),
]
