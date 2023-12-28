from celery import shared_task
from django.core.mail import send_mail
from backend import settings
import logging

logger = logging.getLogger(__name__)

@shared_task(bind=True)
def send_notification_mail(self):
    logger.info('entered')
    try:
        mail_subject = "Welcome on Board!"
        send_mail(
            subject=mail_subject,
            message='message from ADZAP',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=['shabeer8771@gmail.com'],
            fail_silently=False,
        )
        return "Done"
    except Exception as e:
        print(e)
        raise e

# @shared_task(bind=True)
# def send_post_created_email(self, post_id):
#     try:
#         post = Post.objects.get(id=post_id)
#         print(post)
#         recipient_email = 'shabeer8771@gmail.com'
#         send_mail(
#             subject='New Post Created',
#             message=f'A new post "{post.title}" has been created.',
#             from_email=settings.EMAIL_HOST_USER,
#             recipient_list=[recipient_email],
#             fail_silently=False,
#         )
#         return "Done"
#     except Post.DoesNotExist:
#         print(f'Post with id={post_id} not found')
#     except Exception as e:
#         print(f'Error in send_post_created_email: {str(e)}')



# from django.core.mail import send_mail
# from backend import settings
# send_mail(                    
# ... 'Email checking',              
# ... 'Mail from ADZAP hi Shabeer',
# ... settings.EMAIL_HOST_USER,     
# ...     ['shabeer8771@gmail.com'], 
# ...     fail_silently=False,       
# ... )