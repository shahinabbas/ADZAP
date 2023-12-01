"""
ASGI config for ohh_flash__django project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from django.urls import path

from channels.routing import ProtocolTypeRouter, URLRouter


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ohh_flash__django.settings')

django_asgi_app = get_asgi_application()

from .routing import websocket_urlpatterns
from django_channels_jwt_auth_middleware.auth import JWTAuthMiddlewareStack


application = ProtocolTypeRouter(
    {
        'http': django_asgi_app,
        'websocket':JWTAuthMiddlewareStack(
            URLRouter(websocket_urlpatterns)
        )
    }
)