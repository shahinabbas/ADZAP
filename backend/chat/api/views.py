from django.db.models import Max
from django.db.models import Count
from rest_framework import status
from rest_framework.response import Response
from .serializers import CustomerChatSerializer, NotificationSerializer, ChatCountSerializer
from rest_framework import generics
from django.contrib.auth import get_user_model
from chat.models import CustomerChat, Notification
from accounts.models import CustomUser
from django.db.models import Q
User = get_user_model()


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
        messages.update(is_read=True)
        return messages


class UserMessagesView(generics.ListAPIView):
    serializer_class = CustomerChatSerializer

    def get_queryset(self):
        current_user_id = self.kwargs['current_user_id']

        latest_messages = CustomerChat.objects.filter(user=current_user_id) \
            .values('other_user') \
            .annotate(latest_message=Max('time')) \
            .order_by()

        queryset = CustomerChat.objects.filter(user=current_user_id) \
            .filter(time__in=[message['latest_message'] for message in latest_messages])

        return queryset


class UserChatCountListView(generics.ListAPIView):
    model = CustomerChat
    serializer_class = ChatCountSerializer

    def get_queryset(self):
        queryset = CustomerChat.objects.filter(is_read=False).values(
            'user').annotate(count=Count('user')).order_by('-count')
        return queryset


class ChatHistoryWithId(generics.RetrieveAPIView):
    serializer_class = CustomerChatSerializer

    def get_queryset(self):
        chat_id = self.kwargs.get('pk')
        return CustomerChat.objects.filter(id=chat_id)


class NotificationListApi(generics.ListAPIView):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        notification_id = self.kwargs.get('pk')
        return Notification.objects.filter(user_id=notification_id)


class NotificationIsSeen(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NotificationSerializer

    def get_object(self):
        user_id = self.kwargs.get('id')
        return Notification.objects.filter(user=user_id)

    def partial_update(self, request, *args, **kwargs):
        instances = self.get_object()
        for instance in instances:
            serializer = self.get_serializer(
                instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save(is_seen=True)

        return Response({"detail": "All notifications updated successfully"}, status=status.HTTP_200_OK)
