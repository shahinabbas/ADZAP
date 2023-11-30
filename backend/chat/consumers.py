import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from chat.models import CustomerChat

class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("WebSocket connected")

        my_id=self.scope['user'].id
        other_user_id=self.scope['url_route']['kwargs']['id']
        if int(my_id)>int(other_user_id):
            self.room_name=f'{my_id}-{other_user_id}'
        else:
            self.room_name=f'{other_user_id}-{my_id}'
        
        self.room_group_name='chat_%s' % self.room_name

        await self.channel_layer.group_add{
            self.room_group_name,
            self.channel_name,
        }
        await self.accept()

        async def disconnect(self,code):
            print("WebSocket disconnected")

            self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_layer  
            )

        async def receive(self,text_data=None,bytes_data=None):
            print("WebSocket recieved")

            data=json.loads(text_data)
            message=data['message']
            username=data['username']

            await self.save_message(username,self.room_group_name,message)
            await self.cahnnel_layer.group_send(
                self.room_group_name,
                {
                    'type':'chat_message',
                    'message':message,
                    'username':username  
                }
            )
        
        async def chat_message(self,event):
            message=event['message']
            username=event['username']

            await self.send(text_data=json.dumps({
                'message':message,
                'username':username
            }))

        @database_sync_to_async
        def save_message(self,username,group_name,message):
            CustomerChat.objects.create(sender=username,message=message,group_name=group_name)