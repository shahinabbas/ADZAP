
# #   // const GetUserChatHistory = async (group_name = "") => {
# #   //   try {
# #   //     const response = await api.get(
# #   //       `${
# #   //         import.meta.env.VITE_APP_BASE_URL
# #   //       }chat/api/history/?group_name=${group_name}`
# #   //     );
# #   //     console.log("response", response.data);
# #   //     const reversedChatHistory = response.data.slice().reverse();
# #   //     console.log("reveresed history", reversedChatHistory);
# #   //     setUserChatHistory(reversedChatHistory);
# #   //   } catch (error) {
# #   //     console.log(error);
# #   //   }
# #   // };

# #   // useEffect(() => {
# #   //   if (selectedUser) {
# #   //     let group_name = `chat_${selectedUser.id}-${user.user.id}`;
# #   //     GetUserChatHistory((group_name = group_name));
# #   //   }
# #   // }, [selectedUser]);


# import json
# from channels.generic.websocket import AsyncWebsocketConsumer
# from channels.db import database_sync_to_async
# from chat.models import CustomerChat


# class PersonalChatConsumer(AsyncWebsocketConsumer):

#     async def connect(self):
#         print('connect')
#         current_user_id = self.scope['url_route']['kwargs']['current_user_id']
#         other_user_id = self.scope['url_route']['kwargs']['other_user_id']

#         self.room_name = f'{current_user_id}-{other_user_id}'
#         self.room_group_name = 'chat_%s' % self.room_name

#         await self.channel_layer.group_add(
#             self.room_group_name,
#             self.channel_name,
#         )
#         await self.accept()

#     async def disconnect(self, code):
#         print("WebSocket disconnected")

#         self.channel_layer.group_discard(
#             self.room_group_name,
#             self.channel_name
#         )

#     async def receive(self, text_data=None, bytes_data=None):
#         print("WebSocket recieved")
#         data = json.loads(text_data)
#         message = data['message']
#         print(message, '111111111111111111111111111111')
#         current_user_id = data['current_user_id']
#         from_user = data['from_user']

#         await self.save_message(user=current_user_id, from_user=from_user, message=message, group_name=self.room_group_name)

#         await self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 'type': 'chat_message',
#                 'message': message,
#                 'current_user_id': current_user_id,
#                 'from_user': from_user
#             }
#         )

#     async def chat_message(self, event):
#         print('messsage recieved')
#         message = event['message']
#         current_user_id = event['current_user_id']
#         from_user = event['from_user']

#         print(f'Sending message: "{message}" from {current_user_id}')
#         await self.send(text_data=json.dumps({
#             'message': message,
#             'current_user_id': current_user_id,
#             'from_user': from_user
#         }))

#     @database_sync_to_async
#     def save_message(self, user, group_name, from_user, message):
#         CustomerChat.objects.create(
#             user=user, message=message, group_name=group_name, from_user=from_user)
