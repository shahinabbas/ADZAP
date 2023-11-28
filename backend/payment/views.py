from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import stripe
from admincontrol.models import Plans   
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from accounts.models import CustomUser
from django.db import transaction
from django.http import JsonResponse
import json
from django.views.decorators.http import require_POST
from django.utils.decorators import method_decorator
from django.views import View

stripe.api_key = settings.STRIPE_SECRET_KEY
endpoint_secret = 'whsec_0415e8d72356ae595c0285b3ae9844c446c6d93066a939322aa999817eaea312'

class StripeCheckoutView(APIView):
    def post(self,request,*args, **kwargs):
        try:
            plan_id = self.kwargs["pk"]
            plan = Plans.objects.get(id=plan_id)
            user_id = request.user.id
            print('1111111111111111111111111111111')
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[
                    {
                        'price_data': {
                            'currency': 'inr',
                            'unit_amount': plan.price*100,
                            'product_data': {
                                'name': plan.title,
                                'images': ['https://imgs.search.brave.com/o6oE4N-ohAvbCYLRheuEHwHhXbn_AGvLHQSY66RgLHo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/Y29uY2VwdC1jcmVk/aXQtY2FyZC1wYXlt/ZW50LWxhbmRpbmct/cGFnZV81MjY4My0y/NDkyMy5qcGc_c2l6/ZT02MjYmZXh0PWpw/Zw'],

                            },
                        },
                        'quantity': 1,
                    },
                ],
                metadata={
                    "plan_id": plan.id,
                    "user_id":user_id,
                },
                mode='payment',

                success_url=settings.SITE_URL + '?success=true&session_id={CHECKOUT_SESSION_ID}',
                cancel_url=settings.SITE_URL + '?canceled=true',
            )
            return Response({
                'redirect_url': checkout_session.url,
            },status=status.HTTP_200_OK)
        except:
            return Response({
                'message':'unable to process payment now',
            },status=status.HTTP_404_NOT_FOUND)
        

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.headers['STRIPE_SIGNATURE']

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        return HttpResponse(status=400)

    if event['type'] == 'checkout.session.completed' or event['type'] == 'checkout.session.async_payment_succeeded':
        session = event['data']['object']
        plan_id = session["metadata"]["plan_id"]
        user_id = session["metadata"]["user_id"]
        payment_id = session["payment_intent"]
        status = session["payment_status"]
        amount_total_paid = session["amount_total"]

        try:
            with transaction.atomic():
                user = CustomUser.objects.select_for_update().get(id=user_id)
                plan = Plans.objects.get(id=plan_id)
                user.coins += plan.coins
                user.save()

        except CustomUser.DoesNotExist:
            return JsonResponse({'message': 'User not found'}, status=404)
        except Plans.DoesNotExist:
            return JsonResponse({'message': 'Plan not found'}, status=404)
        print('webhook')
    else:
        print('Unhandled event type {}'.format(event['type']))
    return HttpResponse(status=200)