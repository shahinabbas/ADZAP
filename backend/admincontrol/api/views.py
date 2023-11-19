from rest_framework import generics
from admincontrol.models import Banner, Category, Post, Box
from .serializers import BannerSerializer, CategorySerializer, PostSerializer,BoxSerializer
from accounts.models import CustomUser
from rest_framework.response import Response
from accounts.api.serializers import UserSerializer
from rest_framework.generics import ListAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.permissions import IsAuthenticated



        
class BoxAddOrRemoveView(generics.GenericAPIView):
    serializer_class = BoxSerializer

    def post(self, request, *args, **kwargs):
        post_id = kwargs.get('post_id')  
        user_id = request.data.get('userId')  # Use 'userId' key
        print("Received data - post_id:", post_id, "user_id:", user_id)

        try:
            existing_box = Box.objects.get(postId=post_id, user=user_id)
            existing_box.delete()
            return Response({"message": "Box removed successfully."}, status=status.HTTP_200_OK)
        except Box.DoesNotExist:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            print("Serializer Data:", serializer.validated_data)
            serializer.save(postId=post_id, user=user_id)
            return Response({"message": "Box added successfully."}, status=status.HTTP_201_CREATED)



class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class BannerListCreateView(generics.ListCreateAPIView):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer


class BannerRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer


class UserListView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class UserEditView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]


class ToggleUserActiveStatus(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def update(self, request, *args, **kwargs):
        print('View called')
        instance = self.get_object()
        instance.is_active = not instance.is_active
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class CategoryListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryCreateView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
