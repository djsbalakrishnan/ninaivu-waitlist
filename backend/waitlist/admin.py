import csv

from django.contrib import admin
from django.http import HttpResponse

from .models import WaitlistEntry


@admin.register(WaitlistEntry)
class WaitlistAdmin(admin.ModelAdmin):
    list_display = ['email', 'source', 'created_at']
    list_filter = ['source', 'created_at']
    search_fields = ['email']
    readonly_fields = ['created_at']
    actions = ['export_csv']

    def export_csv(self, request, queryset):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="ninaivu_waitlist.csv"'
        writer = csv.writer(response)
        writer.writerow(['Email', 'Source', 'Signed up at'])
        for entry in queryset:
            writer.writerow([entry.email, entry.source, entry.created_at.strftime('%Y-%m-%d %H:%M')])
        return response

    export_csv.short_description = 'Export selected entries to CSV'
