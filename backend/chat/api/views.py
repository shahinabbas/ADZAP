from .serializers import CustomerChatSerializer
from rest_framework import generics
from django.contrib.auth import get_user_model
from chat.models import CustomerChat
User = get_user_model()


class UserToSellerChatListApi(generics.ListAPIView):
    model = CustomerChat
    serializer_class = CustomerChatSerializer

    def get_queryset(self):
        group_name = self.request.query_params.get('group_name')

        if group_name is not None:
            return CustomerChat.objects.filter(group_name=group_name).order_by('-time')
        else:
            return CustomerChat.objects.none()
