from django.urls import path
from chat.consumers import PersonalChatConsumer

websocket_urlpatterns = [
    path('ws/chat/<int:current_user_id>/', PersonalChatConsumer.as_asgi()),

]
