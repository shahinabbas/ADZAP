from rest_framework import generics
from admincontrol.models import Banner, Category, Post, Box, Plans, PaymentDetails
from .serializers import BannerSerializer, CategorySerializer, PostSerializer, ReportSerializer, BoxSerializer, PlanSerializer, PasswordChangeSerializer, ChartDataSerializer, PostCountSerializer
from accounts.models import CustomUser
from rest_framework.response import Response
from accounts.api.serializers import UserSerializer
from rest_framework.generics import ListAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
from django.db.models import Q
from django.contrib.auth import authenticate
from django.db.models.functions import TruncMonth
from django.db.models import Sum
from datetime import date, timedelta
from ..tasks import send_notification_mail
from django.db.models import Count, functions


class BoxListCreateView(generics.ListCreateAPIView):
    serializer_class = BoxSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('userId')
        if user_id:
            return Box.objects.filter(user=user_id)
        else:
            return Box.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BoxDeleteView(generics.DestroyAPIView):
    queryset = Box.objects.all()
    serializer_class = BoxSerializer
    lookup_field = 'postId'

    def delete(self, request, *args, **kwargs):
        postId = kwargs.get('postId')
        print(f"Deleting Box with postId: {postId}")

        try:
            instance = self.get_object()
        except Http404:
            print(f"Box with postId {postId} not found.")
            return Response({'detail': 'Item not found.'}, status=status.HTTP_404_NOT_FOUND)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


# class PostListCreateView(generics.ListCreateAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        try:
            queryset = Post.objects.all()
            search_term = self.request.query_params.get('search', None)
            categoryId = self.request.query_params.get('search', None)
            is_active = self.request.query_params.get('is_active', None)
            if is_active:
                queryset = queryset.filter(is_active=True)
            if search_term:
                queryset = queryset.filter(
                    Q(category__name__icontains=search_term) |
                    Q(country__icontains=search_term) |
                    Q(state__icontains=search_term) |
                    Q(city__icontains=search_term) |
                    Q(landmark__icontains=search_term) |
                    Q(pincode__icontains=search_term) |
                    Q(validity__icontains=search_term) |
                    Q(price__icontains=search_term) |
                    Q(discription__icontains=search_term) |
                    Q(media_type__icontains=search_term)
                )
            if categoryId:
                queryset = queryset.filter(category_id=categoryId)
            queryset = queryset.order_by('-time')
            return queryset
        except Exception as e:
            print(f"Error in get_queryset: {str(e)}")
            raise

    def perform_create(self, serializer):
        user = self.request.user

        if user.coins >= 10:
            user.coins -= 10
            user.save()

            serializer.save(user=user)
        else:
            return Response(
                {'error': 'Not enough coins to create a post'},
                status=status.HTTP_400_BAD_REQUEST
            )


class PostList(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        if user_id:
            return Post.objects.filter(user_id=user_id)


class PostRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostToggleActionView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = not instance.is_active
        instance.save()
        # print('mail start',instance.id)
        # if instance.is_active:
        #     print('11111111111111')
        #     send_post_created_email.delay(post_id=instance.id)
        # print('mail func call')
        print('before')
        # if instance.is_active:
        send_notification_mail.delay()
        print('after')
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


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


class ToggleUserActiveStatus(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = not instance.is_active
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class CategoryListView(generics.ListAPIView):
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


class PlanListCreateView(generics.ListCreateAPIView):
    queryset = Plans.objects.all()
    serializer_class = PlanSerializer


class PaymentReport(generics.ListCreateAPIView):
    queryset = PaymentDetails.objects.all()
    serializer_class = ReportSerializer


class PlanRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Plans.objects.all()
    serializer_class = PlanSerializer


class ResetPasswordView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = PasswordChangeSerializer

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        current_password = request.data.get('current_password', None)
        new_password = request.data.get('new_password', None)

        if not current_password:
            return Response({'error': 'Current password is required'}, status=status.HTTP_400_BAD_REQUEST)

        if not authenticate(email=user.email, password=current_password):
            return Response({'error': 'Invalid current password'}, status=status.HTTP_404_NOT_FOUND)

        if new_password:
            user.set_password(new_password)
            user.save()
        return Response({'success': 'Password updated successfully'}, status=status.HTTP_200_OK)


class ChartData(generics.ListAPIView):
    serializer_class = ChartDataSerializer

    def get_queryset(self):
        six_months_ago = date.today() - timedelta(days=6*30)
        queryset = PaymentDetails.objects.filter(date__gte=six_months_ago).annotate(
            month=TruncMonth('date')
        ).values('month').annotate(
            total_price=Sum('price')
        ).order_by('month')
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class PostChartData(generics.ListAPIView):
    serializer_class = PostCountSerializer

    def get_queryset(self):
        queryset = Post.objects.annotate(
            month=functions.TruncMonth('time')
        ).values('month').annotate(count=Count('id')).order_by('month')

        return queryset
