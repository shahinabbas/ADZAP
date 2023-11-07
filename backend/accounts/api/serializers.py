from rest_framework import serializers
from accounts.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('name', 'password', 'email', 'contact_number')
        extra_kwargs = {'password': {'write_only': True}}
    
   