from django.db import models
from accounts.models import CustomUser
# Create your models here.

class CustomerChat(models.Model):
    handle_user_id = models.IntegerField()
    message = models.TextField(null=True,blank=True)
    group_name = models.CharField(max_length=50,null=True,blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    from_user = models.BooleanField(default=False)
    
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