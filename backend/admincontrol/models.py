from django.db import models

class Post(models.Model):
    country = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    landmark = models.CharField(max_length=100)
    pincode = models.IntegerField(max_length=6)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    validity = models.CharField(max_length=1)
    description = models.CharField(max_length=2000)
    media_type = models.CharField(max_length=100)
    image = models.ImageField(upload_to='post/')


class Banner(models.Model):
    text = models.CharField(max_length=1000)
    image = models.ImageField(upload_to='banners/')

class Category(models.Model):
    name=models.CharField(unique=True,max_length=20)
    icon=models.ImageField(upload_to='category/')

class Faq(models.Model):
    question=models.CharField(unique=True,max_length=200)
    answer=models.CharField(unique=True,max_length=2000)
 