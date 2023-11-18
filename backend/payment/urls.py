from django.urls import path
from .views import CreateCheckoutView

urlpatterns = [
    path('create-checkout-session', CreateCheckoutView.as_view()),  

]
