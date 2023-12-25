from __future__ import absolute_import, unicode_literals
import os

from django.conf import settings
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')
app.config_from_object(settings, namespace='CELERY')

app.conf.enable_utc = False


app.conf.update(timezone='Asia/Kolkata')

app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print('Debug task executed!')
    print('Request: {0!r}'.format(self.request))
