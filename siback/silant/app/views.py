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


class HandbooksList(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        data = Handbooks.objects.all()
        serializer = HandbooksIdAndNameSerializer(data, many=True)
        data_sc = User.objects.filter(group='service company')
        sc_serializer = ServiceCompanySerializer(data_sc, many=True)
        if request.user.group=='manager':
            data_cl = User.objects.filter(group='client')
            cl = ClientSerializer(data_cl, many=True).data
        else:
            cl = []
        content = {'name': request.user.name, 'group': request.user.group, 'hb': serializer.data, 'sc': sc_serializer.data, 'cl': cl}
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

    def post(self, request):
        serializer = SetMachineSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response('ggg')

class MachineDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, id):
        user = request.user
        group = user.group

        if group == 'client':
            try:
                queryset = Machine.objects.get(client=user, id=id)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = MachineSerializer(queryset)
            return Response(serializer.data)

        if group == 'manager':
            try:
                queryset = Machine.objects.get(id=id)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = MachineSerializer(queryset)
            return Response(serializer.data)

        if group == 'service company':
            try:
                queryset = Machine.objects.get(service_company=user, id=id)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = MachineSerializer(queryset)
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

    def post(self, request):
        serializer = SetTechServiceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response('ggg')


class ServiceDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        user = request.user
        group = user.group

        if group == 'client':
            try:
                queryset = TechService.objects.get(machine__client=user, id=id)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = TechServiceSerializer(queryset)
            return Response(serializer.data)

        if group == 'manager':
            try:
                queryset = TechService.objects.get(id=id)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = TechServiceSerializer(queryset)
            return Response(serializer.data)

        if group == 'service company':
            try:
                queryset = TechService.objects.get(machine__service_company=user, id=id)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = TechServiceSerializer(queryset)
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

    def post(self, request):
        serializer = SetReclamationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response('ggg')


class ReclamationDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        user = request.user
        group = user.group

        if group == 'client':
            try:
                queryset = Reclamation.objects.get(machine__client=user, id=id)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = ReclamationSerializer(queryset)
            return Response(serializer.data)

        if group == 'manager':
            try:
                queryset = Reclamation.objects.get(id=id)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = ReclamationSerializer(queryset)
            return Response(serializer.data)

        if group == 'service company':
            try:
                queryset = Reclamation.objects.get(machine__service_company=user, id=id)
            except ObjectDoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = ReclamationSerializer(queryset)
            return Response(serializer.data)