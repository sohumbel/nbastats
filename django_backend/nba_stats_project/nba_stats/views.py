from django.shortcuts import render

# Create your views here.
from django.db.models import Q
from rest_framework import generics, filters
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from .models import Player
from .serializers import PlayerSerializer



class PlayerList(generics.ListAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'position']

class PlayerDetail(generics.ListAPIView):
    serializer_class = PlayerSerializer

    def get_queryset(self):
        name = self.kwargs['name']
        queryset = Player.objects.filter(
            Q(name__icontains=name) | 
            Q(name__icontains=name.replace(" ", ""))
        ).order_by('-year')
        
        if not queryset.exists():
            raise NotFound(f"No player found with name containing '{name}'")
        
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
class YearlyStats(generics.ListAPIView):
    serializer_class = PlayerSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'position']

    def get_queryset(self):
        year = self.kwargs['year']
        return Player.objects.filter(year=year)