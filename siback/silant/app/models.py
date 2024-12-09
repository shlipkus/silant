from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from django.db.models.functions import *
import datetime

GROUP_CHOICE = {
    'client': 'client',
    'service company': 'service company',
    'manager': 'manager'
}


class Handbooks(models.Model):
    book_name = models.CharField(max_length=128)
    name = models.CharField(max_length=128)
    description = models.TextField()

    class Meta:
        verbose_name = u'Справочник'
        verbose_name_plural = u'Справочники'

    def __str__(self):
        return self.name


class User(AbstractUser):
    name = models.CharField(max_length=128, blank=False)
    group = models.CharField(max_length=128, choices=GROUP_CHOICE, default='client')

    class Meta:
        verbose_name = u'Пользователь'
        verbose_name_plural = u'Пользователи'

    def __str__(self):
        return self.name


class Machine(models.Model):
    serial_number = models.CharField(max_length=128, verbose_name='Зав. № машины')  #
    tech_model = models.ForeignKey(Handbooks, limit_choices_to={'book_name': 'Модель техники'},
                                   on_delete=models.CASCADE, related_name='tech_model',
                                   verbose_name='Модель техники')  #TEMP
    eng_model = models.ForeignKey(Handbooks, limit_choices_to={'book_name': 'Модель двигателя'},
                                  on_delete=models.CASCADE, related_name='eng_model',
                                  verbose_name='Модель двигателя')  #TEMP
    eng_number = models.CharField(max_length=128, verbose_name='Зав. № двигателя')  #
    trans_model = models.ForeignKey(Handbooks, limit_choices_to={'book_name': 'Модель трансмиссии'},
                                    on_delete=models.CASCADE, related_name='trans_model',
                                    verbose_name='Модель трансмиссии')  #TEMP
    trans_number = models.CharField(max_length=128, verbose_name='Зав. № трансмиссии')  #
    drv_axle_model = models.ForeignKey(Handbooks, limit_choices_to={'book_name': 'Модель ведущего моста'},
                                       on_delete=models.CASCADE, related_name='drv_model',
                                       verbose_name='Модель ведущего моста')  #TEMP
    dev_axle_number = models.CharField(max_length=128, verbose_name='Зав. № ведущего моста')  #
    str_axle_model = models.ForeignKey(Handbooks, limit_choices_to={'book_name': 'Модель управляемого моста'},
                                       on_delete=models.CASCADE,
                                       related_name='str_model', verbose_name='Модель управляемого моста')  #TEMP
    str_axle_number = models.CharField(max_length=128, verbose_name='Зав. № управляемого моста')  #
    sup_contract = models.CharField(max_length=128, verbose_name='Договор поставки №, дата')  #
    ship_date = models.DateField(verbose_name='Дата отгрузки с завода')  #
    consignee = models.CharField(max_length=128, verbose_name='Грузополучатель')  #
    sup_address = models.CharField(max_length=128, verbose_name='Адрес поставки')  #
    equipment = models.TextField(max_length=1024, verbose_name='Комплектация (доп. опции)')  #
    client = models.ForeignKey(User, limit_choices_to={'group': 'client'}, on_delete=models.CASCADE,
                               verbose_name='Клиент')  #
    service_company = models.ForeignKey(User, limit_choices_to={'group': 'service company'}, on_delete=models.CASCADE,
                                        related_name='service_company', verbose_name='Сервисная компания')  #

    class Meta:
        verbose_name = u'Машина'
        verbose_name_plural = u'Машины'

    def __str__(self):
        return self.serial_number


class TechService(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, verbose_name='Зав. № машины')  # Машина
    ts_type = models.ForeignKey(Handbooks, limit_choices_to={'book_name': 'Техническое обслуживание'},
                                on_delete=models.CASCADE,
                                related_name='ts_type', verbose_name='Вид ТО')  #
    date = models.DateField(verbose_name='Дата проведения ТО')  #
    eng_hours = models.FloatField(default=0.0, verbose_name='Наработка, м/ч')  #
    order_number = models.CharField(max_length=128, verbose_name='Номер заказ-наряда')  #
    order_date = models.DateField(verbose_name='Дата заказ-наряда')  #
    service_company = models.ForeignKey(User, limit_choices_to={'group': 'service company'}, on_delete=models.CASCADE,
                                        related_name='ts_service_company', verbose_name='Сервисная компания')  #

    class Meta:
        verbose_name = u'Техническое обслуживание'
        verbose_name_plural = u'Техническое обслуживание'


class Reclamation(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, verbose_name='Зав. № машины')  # Машина
    failure_date = models.DateField(default=datetime.date.today, verbose_name='Дата отказа')  # Дата отказа
    ng_hours = models.FloatField(default=0.0, verbose_name='Наработка, м/ч')  #Наработа
    failure_point = models.ForeignKey(Handbooks, on_delete=models.CASCADE,
                                      limit_choices_to={'book_name': 'Узел отказа'}, related_name='fail_point',
                                      verbose_name='Узел отказа')  #
    failure_desc = models.TextField(verbose_name='Описание отказа')  #Описание отказа
    recovery_method = models.ForeignKey(Handbooks, on_delete=models.CASCADE,
                                        related_name='rec_method', verbose_name='Способ восстановления',
                                        limit_choices_to={'book_name': 'Восстановление'})  #
    used_spares = models.TextField(verbose_name='Используемые запчасти')  #
    recovery_date = models.DateField(default=datetime.date.today, verbose_name='Дата восстановления')  #

    downtime = models.GeneratedField(
        expression=Round((models.F('recovery_date') - models.F('failure_date')) / 84600000000),
        output_field=models.IntegerField(),
        verbose_name='Время простоя техники',
        db_persist=True,
    )  #

    service_company = models.ForeignKey(User, limit_choices_to={'group': 'service company'},
                                        on_delete=models.CASCADE, verbose_name='Сервисная компания')  #

    class Meta:
        verbose_name = u'Рекламация'
        verbose_name_plural = u'Рекламации'

    def __str__(self):
        return f'Рекламация машины {self.machine}'
