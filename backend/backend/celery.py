from __future__ import absolute_import, unicode_literals
import os

from celery import Celery
import logging
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.enable_utc = False


app.conf.update(timezone='Asia/Kolkata')

app.autodiscover_tasks()

logging.basicConfig(level=logging.INFO)

@app.task(bind=True)
def debug_task(self):
    print('Debug task executed!')
    print('Request: {0!r}'.format(self.request))
