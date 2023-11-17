from django.db import models
from accounts.models import CustomUser

class Post(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    category=models.ForeignKey('Category',on_delete=models.CASCADE)
    country = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    landmark = models.CharField(max_length=100)
    pincode = models.IntegerField()
    validity = models.CharField(max_length=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    size=models.IntegerField()
    image = models.ImageField(upload_to='post/')
    discription = models.CharField(max_length=2000)
    media_type = models.CharField(max_length=100)
    is_active=models.BooleanField(default=False)


class Banner(models.Model):
    text = models.CharField(max_length=1000)
    image = models.ImageField(upload_to='banners/')

class Category(models.Model):
    name=models.CharField(unique=True,max_length=20)
    icon=models.ImageField(upload_to='category/')

class Faq(models.Model):
    question=models.CharField(unique=True,max_length=200)
    answer=models.CharField(unique=True,max_length=2000)
 