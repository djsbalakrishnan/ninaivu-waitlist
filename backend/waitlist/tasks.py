from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_confirmation_email(self, email):
    try:
        send_mail(
            subject="You're on the Ninaivu waitlist!",
            message=(
                "Hi,\n\n"
                "You're on the Ninaivu waitlist. We'll reach out as soon as early access opens.\n\n"
                "In the meantime, tell a friend who's prepping for interviews.\n\n"
                "— The Ninaivu team"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False,
        )
    except Exception as exc:
        raise self.retry(exc=exc)
