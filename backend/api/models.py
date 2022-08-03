from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.contrib.postgres.fields import IntegerRangeField
import datetime


# Create your models here.
class User(AbstractUser):
    pass

class Exercise(models.Model):
    # change max length to 50
    name = models.CharField(max_length=20)
    muscles = ArrayField(models.CharField(max_length=20), blank=True)
    equipment = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class LoggedExercise(models.Model):
    last_done = models.DateField(blank=True, default=datetime.date.today)
    last_set = ArrayField(models.IntegerField(blank=True, default=0), verbose_name="last: weight(lbs), reps", size = 2, blank=True, default=[0,0])
    max_set = ArrayField(models.IntegerField(blank=True, default=0), verbose_name="max: weight(lbs), reps", size = 2, blank=True, default=[0,0])
    owner = models.ForeignKey(User, related_name='exercises', on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)

class Workout(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=20, blank=True, default="Workout {}".format(id))
    exercises = models.ManyToManyField(Exercise)
    sets_per = ArrayField(models.IntegerField())
    rep_ranges = ArrayField(models.CharField(max_length=10))
    last_done = models.DateField(blank=True, default=datetime.date.today)
    owner = models.ForeignKey(User, related_name='workouts', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class LoggedWorkout(models.Model):
    name = models.CharField(max_length=20)
    workout = models.ForeignKey(Workout, on_delete=models.SET("Workout has been deleted"))
    date = models.DateField(blank=True, default=datetime.date.today)
    owner = models.ForeignKey(User, related_name='logged_workouts', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Split(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, blank=True, default="Split {}".format(id))
    M = models.CharField(max_length=50)
    T = models.CharField(max_length=50)
    W = models.CharField(max_length=50)
    Th = models.CharField(max_length=50)
    F = models.CharField(max_length=50)
    S = models.CharField(max_length=50)
    Su = models.CharField(max_length=50)
    owner = models.ForeignKey(User, related_name='splits', on_delete=models.CASCADE)

    def __str__(self):
        return self.name