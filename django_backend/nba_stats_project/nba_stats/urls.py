from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlayerList, PlayerDetail, YearlyStats


urlpatterns = [
    path('players/', PlayerList.as_view(), name='player-list'),
    path('players/<str:name>/', PlayerDetail.as_view(), name='player-detail'),
    path('stats/<int:year>/', YearlyStats.as_view(), name='yearly-stats'),
]