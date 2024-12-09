from django.db.models.signals import pre_save
from django.dispatch import receiver

from .models import Reclamation


@receiver(pre_save, sender=Reclamation)
def rec_save(instance, **kwargs):
    print('Время', instance.downtime)