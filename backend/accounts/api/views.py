from rest_framework import generics, status
from rest_framework.response import Response
from accounts.models import CustomUser
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login, authenticate
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView


class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        try:
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            content = {
                'Message': 'User Registered Successfully',
                'user': serializer.data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            return Response(content, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([AllowAny])
class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if email and password:
            user = authenticate(request, email=email, password=password)

            if user:
                login(request, user)
                refresh = RefreshToken.for_user(user)
                serializer = UserSerializer(user)
                return Response({
                    'Message': 'Login Successful',
                    'user': serializer.data,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'Both email and password are required'}, status=status.HTTP_400_BAD_REQUEST)


class ToggleUserActiveStatus(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = not instance.is_active
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
