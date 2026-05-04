from rest_framework import serializers

from .models import WaitlistEntry


class WaitlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitlistEntry
        fields = ['email', 'source', 'referrer']

    def validate_email(self, value):
        return value.lower().strip()
