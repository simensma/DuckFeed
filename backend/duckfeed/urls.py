"""duckfeed URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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

from duckevents import views
from duckevents.tasks import insert_scheduled_events

router = routers.DefaultRouter()

router.register(r'entry', views.DuckFeedEntryViewSet, basename='entry')
router.register(r'country', views.CountryViewSet, basename='country')
router.register(r'food_type', views.FoodTypeViewSet, basename='food-type')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('duckfeed/', include(router.urls))
]

# Initialize background task to check for new scheduled events every 5min
insert_scheduled_events(repeat=5*60, repeat_until=None)
