
from django.urls import path, include
from rest_framework import routers

from . import views

urlpatterns = [

    # path("my-messages/<user_id>/", views.MyInbox.as_view(), name='my_messages'),
    # path("get-messages/<sender_id>/<reciever_id>/", views.GetMessages.as_view(), name='get_messages'),
    # path("send-messages/",views.SendMessages.as_view(),name='send_messages')
]
