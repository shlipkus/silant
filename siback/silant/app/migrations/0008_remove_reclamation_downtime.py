# Generated by Django 5.1.3 on 2024-12-08 11:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_reclamation_downtime'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reclamation',
            name='downtime',
        ),
    ]
