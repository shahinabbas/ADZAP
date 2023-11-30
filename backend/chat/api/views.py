from django.db.models import Q
from accounts.models import CustomUser
from .serializers import CustomerChatSerializer
from rest_framework import generics
from django.contrib.auth import get_user_model
from chat.models import CustomerChat
User = get_user_model()
from django.db.models import Subquery,OuterRef

class MyInbox(generics.ListAPIView):
    serializer_class = CustomerChatSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']

        messages = CustomerChat.objects.filter(
            id=Subquery(CustomUser.objects.filter(
                Q(sender__reciever=user_id) |
                Q(reciever__sender=user_id)
            ).distinct().annotate(
                last_msg=Subquery(
                    CustomerChat.objects.filter(
                        Q(sender=OuterRef('id'), reciever=user_id) |
                        Q(reciever=OuterRef('id'), sender=user_id)
                    ).order_by("-id")[:1].values_list("id", flat=True)
                )
            ).values_list("last_msg", flat=True).order_by("-id")
            )
        ).order_by("-id")
        return messages

class GetMessages(generics.ListAPIView):
    serializer_class=CustomerChatSerializer

    def get_queryset(self):
        sender_id=self.kwargs['sender_id']
        reciever_id=self.kwargs['reciever_id']

        messages=CustomerChat.objects.filter(
            sender__in=[sender_id,reciever_id],
            reciever__in=[sender_id,reciever_id]
        )
        return messages
    
class SendMessages(generics.CreateAPIView):
    serializer_class=CustomerChatSerializer

    
# def chatPage(request,username):
#     user_obj=User.objects.get(username=username)
#     users=User.objects.exclude(username=request.user.username)

#     if request.user.id>user_obj.id:
#         group_name=f'chat_{request.user.id}-{user_obj.id}'
#     else:
#         group_name=f'chat_{user_obj.id}-{request.user.id}'
#     message_obj=CustomerChat.objects.filter(groupname=group_name)
