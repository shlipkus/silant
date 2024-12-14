from .models import *
from rest_framework import serializers


class HandbooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Handbooks
        fields = '__all__'


class BaseMachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = ['serial_number', 'tech_model', 'eng_model', 'eng_number', 'trans_model', 'trans_number',
                  'drv_axle_model', 'dev_axle_number', 'str_axle_model', 'str_axle_number']
        depth = 1


class TechServiceSerializer(serializers.ModelSerializer):
    service_company = serializers.CharField()
    machine = serializers.CharField()

    class Meta:
        model = TechService
        fields = ['machine', 'ts_type', 'date', 'eng_hours', 'order_number', 'order_date', 'service_company']
        depth = 2


class MachineSerializer(serializers.ModelSerializer):
    client = serializers.CharField()
    service_company = serializers.CharField()

    class Meta:
        model = Machine
        fields = ['serial_number', 'tech_model', 'eng_model', 'eng_number', 'trans_model', 'trans_number',
                  'drv_axle_model', 'dev_axle_number', 'str_axle_model', 'str_axle_number', 'sup_contract',
                  'ship_date', 'consignee', 'sup_address', 'equipment', 'client', 'service_company']
        depth = 1


class ReclamationSerializer(serializers.ModelSerializer):
    machine = serializers.CharField()
    service_company = serializers.CharField()

    class Meta:
        model = Reclamation
        fields = ['machine', 'failure_date', 'ng_hours', 'failure_point', 'failure_desc', 'recovery_method',
                  'used_spares', 'recovery_date', 'downtime', 'service_company']
        depth = 1