from rest_framework import serializers
from models.models import Weekdays


class WeekdaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weekdays
        fields = '__all__'
