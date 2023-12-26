
from django.urls import path, include
from rest_framework import routers

from . import views

urlpatterns = [
    path("history/", views.UserToSellerChatListApi.as_view(),
         name="get-chat-history"),
    path("userfrommessage/<int:current_user_id>/", views.UserMessagesView.as_view(),
         name="user-from-message"),
    path("count/", views.UserChatCountListView.as_view(),
         name="get-chat-count"),
    path("history/<int:pk>/", views.ChatHistoryWithId.as_view(),
         name="get-chat-history-id"),
    path('notification/<int:pk>/', views.NotificationListApi.as_view(),
         name='list-notification'),
    path('notification/isseen/<int:id>/', views.NotificationIsSeen.as_view(),
         name='notification-isseen')
]
