from django.db import models


class WaitlistEntry(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    source = models.CharField(max_length=100, blank=True, default='')
    referrer = models.URLField(blank=True, default='')

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Waitlist entry'
        verbose_name_plural = 'Waitlist entries'

    def __str__(self):
        return self.email
