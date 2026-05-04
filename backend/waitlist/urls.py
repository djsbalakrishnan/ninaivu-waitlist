from django.urls import path

from .views import join_waitlist, waitlist_count

urlpatterns = [
    path('', join_waitlist, name='waitlist-join'),
    path('count/', waitlist_count, name='waitlist-count'),
]
