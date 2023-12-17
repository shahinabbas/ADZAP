from .serializers import CustomerChatSerializer, NotificationSerializer
from rest_framework import generics
from django.contrib.auth import get_user_model
from chat.models import CustomerChat, Notification
from accounts.models import CustomUser
User = get_user_model()
from rest_framework.response import Response
from rest_framework import status

class UserToSellerChatListApi(generics.ListAPIView):
    model = CustomerChat
    serializer_class = CustomerChatSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if self.request.user.id > int(user_id):
            group_name = f'chat_{self.request.user.id}-{user_id}'
        else:
            group_name = f'chat_{user_id}-{self.request.user.id}'
        messages = CustomerChat.objects.filter(group_name=group_name)
        return messages

class ChatHistoryWithId(generics.RetrieveAPIView):
    serializer_class = CustomerChatSerializer

    def get_queryset(self):
        chat_id=self.kwargs.get('pk')
        return CustomerChat.objects.filter(id=chat_id)


class NotificationListApi(generics.ListAPIView):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        notification_id=self.kwargs.get('pk')
        return Notification.objects.filter(user_id=notification_id)
    
    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_seen = True
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
