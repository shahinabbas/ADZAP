from django.urls import path
from . import views

urlpatterns = [
    # path('hello/', views.hello, name='hello'),
    path('api/hello/', views.hello, name='api_hello'),
]
