from django.conf import settings
from django.core.mail import send_mail
from django.db import IntegrityError
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .models import WaitlistEntry
from .serializers import WaitlistSerializer


class WaitlistThrottle(AnonRateThrottle):
    rate = '3/hour'


@api_view(['POST'])
@throttle_classes([WaitlistThrottle])
def join_waitlist(request):
    serializer = WaitlistSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    try:
        entry = serializer.save()
        send_mail(
            subject="You're on the Ninaivu waitlist!",
            message=(
                "Hi,\n\n"
                "You're on the Ninaivu waitlist. We'll reach out as soon as early access opens.\n\n"
                "In the meantime, tell a friend who's prepping for interviews.\n\n"
                "— The Ninaivu team"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[entry.email],
            fail_silently=True,
        )
        return Response(
            {'message': 'You are on the waitlist!'},
            status=status.HTTP_201_CREATED,
        )
    except IntegrityError:
        return Response(
            {'message': 'You are already on the waitlist.'},
            status=status.HTTP_200_OK,
        )


@api_view(['GET'])
def waitlist_count(request):
    count = WaitlistEntry.objects.count()
    return Response({'count': count})
