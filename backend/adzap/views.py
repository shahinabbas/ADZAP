from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


# def hello(request):
#     return HttpResponse("Hello, World!")


@require_http_methods(["GET"])
def hello(request):
    data = {
        'message': 'Hello, World!'
    }
    return JsonResponse(data)

