from django.db import models
from accounts.models import CustomUser
# Create your models here.

class CustomerChat(models.Model):
    user_id = models.IntegerField()
    message = models.TextField(null=True,blank=True)
    group_name = models.CharField(max_length=50,null=True,blank=True)
    time = models.DateTimeField(auto_now_add=True)
    is_read=models.BooleanField(default=False)

    # class meta:
    #     ordering=['time']

    def __str__(self):
        return self.message


class ChatMessages(models.Model):
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='user')
    reciever=models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='reciever')

    message=models.CharField(max_length=1000)
    is_read=models.BooleanField(default=False)
    date=models.DateTimeField(auto_now_add=True)   

    class Meta:
        ordering=['date']
        verbose_name_plural='Message' 
    
    def __str__(self):
        return self.message



class Notification(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True,blank=True)
    created_at = models.DateTimeField(auto_now=True)
    is_seen = models.BooleanField(default=False)
    
    # def __str__(self):
    #     return f'{self.user.first_name}-{self.flash.title}'
    
    class Meta:
        ordering = ['-created_at']