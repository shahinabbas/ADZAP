from django.db import models


class Banner(models.Model):
    text = models.CharField(max_length=1000)
    image = models.ImageField(upload_to='banners/')

class Category(models.Model):
    name=models.CharField(unique=True,max_length=20)
    icon=models.ImageField(upload_to='category/')

class Faq(models.Model):
    question=models.CharField(unique=True,max_length=200)
    answer=models.CharField(unique=True,max_length=2000)
 