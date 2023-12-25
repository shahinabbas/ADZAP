from django.urls import path
from chat.consumers import PersonalChatConsumer, NotificationStatus

websocket_urlpatterns = [
    path('ws/<int:current_user_id>/<int:other_user_id>/',
         PersonalChatConsumer.as_asgi()),
    path('ws/notification/<int:user_id>/', NotificationStatus.as_asgi())
]
