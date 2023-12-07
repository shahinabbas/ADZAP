from celery import shared_task
from django.core.mail import send_mail
from .models import Post
from accounts.models import CustomUser  

@shared_task(bind=True)
def send_post_created_email(self):
    try:
        post = Post.objects.latest('time')
        print(post)
        subject = 'New Post Created'
        message = f'A new post "{post.title}" has been created.'
        from_email = 'shahinabbas771@gmail.com'
        recipient_list = [user.email for user in CustomUser.objects.all()] 

        send_mail(subject, message, from_email, recipient_list)

        print('Email sent successfully')
    except Post.DoesNotExist:
        print('No posts found')
    except Exception as e:
        print(f'Error in send_post_created_email: {str(e)}')
