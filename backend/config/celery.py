import os

from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('ninaivu')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# ── Celery Beat (scheduled tasks) ─────────────────────────────────────────────
# Not needed for the waitlist phase — the worker only fires confirmation emails
# on signup. Enable Beat after launch when you add daily review reminders.
#
# To enable:
#   1. pip install django-celery-beat
#   2. Add 'django_celery_beat' to INSTALLED_APPS in settings.py
#   3. python manage.py migrate
#   4. Add a ninaivu-beat service to render.yaml:
#      startCommand: celery -A config beat --loglevel=info \
#                    --scheduler django_celery_beat.schedulers:DatabaseScheduler
#   5. Uncomment the schedule below.
#
# from celery.schedules import crontab
# app.conf.beat_schedule = {
#     'send-daily-review-reminders': {
#         'task': 'waitlist.tasks.send_review_reminders',
#         'schedule': crontab(hour=8, minute=0),
#     },
# }
