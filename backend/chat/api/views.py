from .serializers import CustomerChatSerializer
from rest_framework import generics
from django.contrib.auth import get_user_model
from chat.models import CustomerChat
from accounts.models import CustomUser
User = get_user_model()


class UserToSellerChatListApi(generics.ListAPIView):
    model = CustomerChat
    serializer_class = CustomerChatSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if self.request.user.id > int(user_id):  
            group_name = f'chat_{self.request.user.id}-{user_id}'
            print(group_name,'grp')
        else:
            group_name = f'chat_{user_id}-{self.request.user.id}'
            print(group_name,'grp')
        messages = CustomerChat.objects.filter(group_name=group_name)
        return messages
