from platform import machine

from .models import *
from rest_framework import serializers




class HandbooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Handbooks
        fields = '__all__'

class HandbooksIdAndNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Handbooks
        fields = ['id', 'book_name', 'name']

class ServiceCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name']

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name']


class AuthListSerializer(serializers.Serializer):
    name = serializers.CharField()
    group = serializers.CharField()
    hb = HandbooksIdAndNameSerializer(data=Handbooks.objects.all(), many=True)
    sc = ServiceCompanySerializer(data=User.objects.filter(group='service company'), many=True)
    cl = ClientSerializer(data=User.objects.filter(group='client'), many=True)


class NumSerializer(serializers.Serializer):
    num = serializers.CharField()

class BaseMachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = ['serial_number', 'tech_model', 'eng_model', 'eng_number', 'trans_model', 'trans_number',
                  'drv_axle_model', 'dev_axle_number', 'str_axle_model', 'str_axle_number']
        depth = 1


class MachineSerializer(serializers.ModelSerializer):
    client = serializers.CharField()
    service_company = serializers.CharField()

    class Meta:
        model = Machine
        fields = ['id', 'serial_number', 'tech_model', 'eng_model', 'eng_number', 'trans_model', 'trans_number',
                  'drv_axle_model', 'dev_axle_number', 'str_axle_model', 'str_axle_number', 'sup_contract',
                  'ship_date', 'consignee', 'sup_address', 'equipment', 'client', 'service_company']

        depth = 1


class SetMachineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Machine
        fields = ['id', 'serial_number', 'tech_model', 'eng_model', 'eng_number', 'trans_model', 'trans_number',
                  'drv_axle_model', 'dev_axle_number', 'str_axle_model', 'str_axle_number', 'sup_contract',
                  'ship_date', 'consignee', 'sup_address', 'equipment', 'client', 'service_company']

    def create(self, validated_data):
        return Machine.objects.create(**validated_data)


class TechServiceSerializer(serializers.ModelSerializer):
    machine = MachineSerializer(read_only=True)
    ts_type= HandbooksSerializer(read_only=True)
    service_company = serializers.SlugRelatedField(slug_field='name', queryset=User.objects.filter(group='service company'))

    class Meta:
        model = TechService
        fields = ['id', 'machine', 'ts_type', 'date', 'eng_hours', 'order_number', 'order_date', 'service_company']

class SetTechServiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = TechService
        fields = ['id', 'machine', 'ts_type', 'date', 'eng_hours', 'order_number', 'order_date', 'service_company']

    def create(self, validated_data):
        return TechService.objects.create(**validated_data)


class ReclamationSerializer(serializers.ModelSerializer):
    machine = serializers.CharField()
    service_company = serializers.CharField()

    class Meta:
        model = Reclamation
        fields = ['id', 'machine', 'failure_date', 'ng_hours', 'failure_point', 'failure_desc', 'recovery_method',
                  'used_spares', 'recovery_date', 'downtime', 'service_company']
        depth = 1


class SetReclamationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reclamation
        fields = ['id', 'machine', 'failure_date', 'ng_hours', 'failure_point', 'failure_desc', 'recovery_method',
                  'used_spares', 'recovery_date', 'service_company']

    def validate(self, data):
        if data['failure_date'] > data['recovery_date']:
            raise serializers.ValidationError("Проверьте даты")
        return data

    def create(self, validated_data):
        return Reclamation.objects.create(**validated_data)
