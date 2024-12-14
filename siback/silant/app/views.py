from django.contrib.auth import authenticate
from django.shortcuts import render
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from django.core.exceptions import ObjectDoesNotExist

from .models import *
from .serializers import *

group_name = {
    'client': 'Клиент',
    'manager': 'Менеджер',
    'service company': 'Сервисная компания'
}


# Create your views here.
class HandbooksViewSet(viewsets.ModelViewSet):
    queryset = Handbooks.objects.all()
    serializer_class = HandbooksSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [permissions.IsAdminUser]


class Index(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        content = {'name': request.user.name, 'group': group_name[request.user.group]}
        return Response(content)


class BaseMachine(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        num = request.data.get('num', None)
        if num is None:
            return Response({"error": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            queryset = Machine.objects.get(serial_number=num)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)
        serializer = BaseMachineSerializer(queryset)
        return Response(serializer.data)


class MachineDataView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        group = user.group
        sort = request.query_params.get('order_by', 'serial_number')
        if sort == '':
            sort = 'serial_number'
        filter_by = dict(filter(lambda x: x[1], request.query_params.dict().items()))
        if 'order_by' in filter_by.keys():
            del filter_by['order_by']

        if group == 'client':
            try:
                queryset = Machine.objects.filter(client=user).filter(**filter_by).order_by(sort)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = MachineSerializer(queryset, many=True)
            return Response(serializer.data)

        if group == 'manager':
            try:
                queryset = Machine.objects.filter(**filter_by).order_by(sort)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = MachineSerializer(queryset, many=True)
            return Response(serializer.data)

        if group == 'service company':
            try:
                queryset = Machine.objects.filter(service_company=user).filter(**filter_by).order_by(sort)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = MachineSerializer(queryset, many=True)
            return Response(serializer.data)


class ServiceDataView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        group = user.group
        sort = request.query_params.get('order_by', 'date')
        if sort == '':
            sort = 'date'
        filter_by = dict(filter(lambda x: x[1], request.query_params.dict().items()))
        if 'order_by' in filter_by.keys():
            del filter_by['order_by']

        if group == 'client':
            try:
                queryset = TechService.objects.filter(machine__client=user).filter(**filter_by).order_by(sort)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = TechServiceSerializer(queryset, many=True)
            return Response(serializer.data)

        if group == 'manager':
            try:
                queryset = TechService.objects.filter(**filter_by).order_by(sort)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = TechServiceSerializer(queryset, many=True)
            return Response(serializer.data)

        if group == 'service company':
            try:
                queryset = TechService.objects.filter(machine__service_company=user).filter(**filter_by).order_by(sort)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = TechServiceSerializer(queryset, many=True)
            return Response(serializer.data)


class ReclamationDataView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        group = user.group
        sort = request.query_params.get('order_by', 'failure_date')
        if sort == '':
            sort = 'failure_date'
        filter_by = dict(filter(lambda x: x[1], request.query_params.dict().items()))
        if 'order_by' in filter_by.keys():
            del filter_by['order_by']

        if group == 'client':
            try:
                queryset = Reclamation.objects.filter(machine__client=user).filter(**filter_by).order_by(sort)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = ReclamationSerializer(queryset, many=True)
            return Response(serializer.data)

        if group == 'manager':
            try:
                queryset = Reclamation.objects.filter(**filter_by).order_by(sort)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = ReclamationSerializer(queryset, many=True)
            return Response(serializer.data)

        if group == 'service company':
            try:
                queryset = Reclamation.objects.filter(machine__service_company=user).filter(**filter_by).order_by(sort)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = ReclamationSerializer(queryset, many=True)
            return Response(serializer.data)