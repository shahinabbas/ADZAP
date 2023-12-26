
from rest_framework import serializers
from chat.models import CustomerChat, Notification


class ChatCountSerializer(serializers.ModelSerializer):
    user_count = serializers.IntegerField(source='count')     
    class Meta:
        model = CustomerChat
        fields = ('user', 'is_read', 'user_count')

class CustomerChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerChat
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
