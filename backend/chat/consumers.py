import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from chat.models import CustomerChat, Notification
from accounts.models import CustomUser


class PersonalChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        current_user_id = self.scope['url_route']['kwargs']['current_user_id']
        other_user_id = self.scope['url_route']['kwargs']['other_user_id']
        if int(current_user_id) > int(other_user_id):
            self.room_name = f'{current_user_id}-{other_user_id}'
        else:
            self.room_name = f'{other_user_id}-{current_user_id}'

        self.room_group_name = 'chat_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )
        await self.accept()

    async def disconnect(self, code):
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        message = data['message']
        current_user_id = data['current_user_id']
        from_user = data['from_user']
        receiver = data['receiver']

        await self.save_message(user=current_user_id,from_user=from_user, message=message, group_name=self.room_group_name, reciever=receiver)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'current_user_id': current_user_id,
                'from_user': from_user
            }
        )

    async def chat_message(self, event):
        message = event['message']
        current_user_id = event['current_user_id']
        from_user = event['from_user']

        await self.send(text_data=json.dumps({
            'message': message,
            'current_user_id': current_user_id,
            'from_user': from_user
        }))

    @database_sync_to_async
    def save_message(self, user, group_name, from_user, message, reciever):
        other_user_id = self.scope['url_route']['kwargs']['other_user_id']
        chat_obj = CustomerChat.objects.create(
            user=user, other_user=other_user_id, message=message, group_name=group_name, from_user=from_user)

        other_user_id = self.scope['url_route']['kwargs']['other_user_id']
        get_user = CustomUser.objects.get(id=other_user_id)
        if reciever == get_user.id:
            Notification.objects.create(chat=chat_obj, user=get_user)


class NotificationStatus(AsyncWebsocketConsumer):
    async def connect(self):
        print('revubfnkd')
        user_id = self.scope['url_route']['kwargs']['user_id']
        print(user_id)
        if not user_id:
            await self.close()
        self.room_group_name = f'{user_id}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def send_notification(self, event):
        print('send notif')
        value = event.get('value')
        if value is not None:
            try:
                data = json.loads(value)
                count = data.get('count', 0)
                print(count, 'count')
                await self.send(text_data=json.dumps({
                    'count': count
                }))
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'send_notification',
                        'count': count,
                    }
                )
            except json.JSONDecodeError as e:
                print(f"Error decoding JSON: {e}")
        else:
            print("Received None value for 'value' in the event")

    async def disconnect(self, code):
        print('DISCONNECT')
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
