from rest_framework import generics
from accounts.models import CustomUser
from .serializers import UserSerializer

# Create your views here.
class UserRegestartionView(generics.CreateAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=UserSerializer