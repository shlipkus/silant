"""
URL configuration for silant project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from app.views import *

router = routers.DefaultRouter()
router.register(r'handbooks', HandbooksViewSet)


urlpatterns = [
    path('', Index.as_view()),
    path('base', BaseMachine.as_view()),
    path('machines', MachineDataView.as_view()),
    path('service', ServiceDataView.as_view()),
    path('reclamations', ReclamationDataView.as_view()),
    path('api', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('token', obtain_auth_token)
]
