from django.urls import path
from . import views

urlpatterns = [
    path('create-checkout-session', views.StripeCheckoutView.as_view(), name='test_payment'),
]
