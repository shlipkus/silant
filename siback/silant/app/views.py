from django.shortcuts import render
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from django.core.exceptions import ObjectDoesNotExist

from .models import *
from .serializers import *


# Create your views here.
class HandbooksViewSet(viewsets.ModelViewSet):
    queryset = Handbooks.objects.all()
    serializer_class = HandbooksSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [permissions.IsAdminUser]


class Index(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        content = {'message': 'GoGOOGoGog'}
        return Response(content)


class BaseMachine(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        num = request.data.get('num')
        if num is None:
            return Response({"error": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            queryset = Machine.objects.get(serial_number=num)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)
        serializer = BaseMachineSerializer(queryset)
        return Response(serializer.data)

    def get(self, request):
        queryset = Machine.objects.get(serial_number='0019')
        serializer = BaseMachineSerializer(queryset)
        return Response(serializer.data)