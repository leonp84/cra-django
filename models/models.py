from django.db import models


class Weekdays(models.Model):
    mon = models.IntegerField()
    tue = models.IntegerField()
    wed = models.IntegerField()
    thu = models.IntegerField()
    fri = models.IntegerField()
    sat = models.IntegerField()
    sun = models.IntegerField()

    def __str__(self):
        return self.mon
