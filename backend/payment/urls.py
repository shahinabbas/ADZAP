from django.urls import path
from . import views

urlpatterns = [
    path('create-checkout-session/<int:pk>', views.StripeCheckoutView.as_view(), name='test_payment'),
    path('webhook',views.stripe_webhook, name='webhook'),

]
