# Generated by Django 5.1.3 on 2024-12-07 20:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_reclamation_downtime'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reclamation',
            name='downtime',
        ),
    ]
