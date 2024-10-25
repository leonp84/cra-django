from rest_framework import viewsets
from models.models import Weekdays
from .serializers import WeekdaysSerializer


class WeekdaysViewSet(viewsets.ModelViewSet):
    queryset = Weekdays.objects.all()
    serializer_class = WeekdaysSerializer
