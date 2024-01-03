from rest_framework import serializers
from admincontrol.models import Banner, Category, Faq, Post, Box, Plans, PaymentDetails


class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class BoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Box
        fields = '__all__'


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plans
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentDetails
        fields = '__all__'


class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField()
    new_password = serializers.CharField()


class ChartDataSerializer(serializers.Serializer):
    month = serializers.DateField()
    total_price = serializers.IntegerField()

# class DateOnlyField(serializers.ReadOnlyField):
#     def to_representation(self, value):
#         return value.date()

class PostCountSerializer(serializers.Serializer):
    month = serializers.DateField(format='%Y-%m')
    count = serializers.IntegerField()


