# Generated by Django 5.1.3 on 2024-12-08 11:27

import django.db.models.expressions
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_remove_reclamation_downtime'),
    ]

    operations = [
        migrations.AddField(
            model_name='reclamation',
            name='downtime',
            field=models.GeneratedField(db_persist=True, expression=django.db.models.expressions.CombinedExpression(django.db.models.expressions.CombinedExpression(models.F('recovery_date'), '-', models.F('failure_date')), '/', models.Value(84600000000)), output_field=models.IntegerField(default=0), verbose_name='Время простоя техники'),
        ),
    ]