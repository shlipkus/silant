from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Handbooks, User, Machine, TechService, Reclamation



class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'name', 'group',)
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_active', 'name', 'group')}
         ),
    )

    fieldsets = (
        (None, {'fields': ('username', 'name', 'email', 'password', 'group')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )


class HandbooksAdmin(admin.ModelAdmin):
    list_display = ('name', 'book_name')


class MachineAdmin(admin.ModelAdmin):
    list_display = ('serial_number', 'tech_model')


class TechAdmin(admin.ModelAdmin):
    list_display = ('machine', 'ts_type', 'date')


class ReclamationAdmin(admin.ModelAdmin):
    list_display = ('machine', 'recovery_method')
    readonly_fields = ('downtime',)


# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Handbooks, HandbooksAdmin)
admin.site.register(Machine, MachineAdmin)
admin.site.register(TechService, TechAdmin)
admin.site.register(Reclamation, ReclamationAdmin)
