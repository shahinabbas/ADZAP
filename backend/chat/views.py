from django.shortcuts import render
from backend.accounts.models import CustomUser

# Create your views here.
def chatPage(request,username):
    users=CustomUser.objects.exclude(username=request.user.username)
    pass