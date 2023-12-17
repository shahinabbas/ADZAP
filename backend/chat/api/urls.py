
from django.urls import path, include
from rest_framework import routers

from . import views

urlpatterns = [
    path("history/", views.UserToSellerChatListApi.as_view(),
         name="get-chat-history"),
    path("history/<int:pk>/", views.ChatHistoryWithId.as_view(),
         name="get-chat-history-id"),
    path('notification/<int:pk>/', views.NotificationListApi.as_view(),
         name='list-notification')
]
