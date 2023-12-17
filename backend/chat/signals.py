from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Notification
import json

@receiver(post_save, sender=Notification)
def send_notification(sender, instance, created, **kwargs):
    if created:
        print('signallllllllllllllllllllllllllllllllllllll')
        async def send_notification_async():
            print('send_notification_async')
            channel_layer = get_channel_layer()
            notification_obj = await database_sync_to_async(
                Notification.objects.filter(is_seen=False, user=instance.user).count
            )()

            user_id = str(instance.user.id)
            data = {
                'count': notification_obj
            }
            print('1111111111111111111111111')
            await channel_layer.group_send(
                user_id,
                {
                    'type': 'send_notification',
                    'value': json.dumps(data)
                }
            )
        async_to_sync(send_notification_async)()
