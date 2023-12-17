
from rest_framework import serializers
from chat.models import CustomerChat, Notification


class CustomerChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerChat
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
