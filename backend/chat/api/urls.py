
from django.urls import path, include
from rest_framework import routers

from . import views

urlpatterns = [
    path("history/", views.UserToSellerChatListApi.as_view(),
         name="get-chat-history"),
]
