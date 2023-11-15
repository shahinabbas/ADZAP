from django.urls import path
from .views import UserRegistrationView,UserLoginView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns=[
    path('register/',UserRegistrationView.as_view(),name='user-registration'),
    path('login/',UserLoginView.as_view(),name='user-login'),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
