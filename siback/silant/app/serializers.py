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