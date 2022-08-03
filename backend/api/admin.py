from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Exercise, LoggedExercise, Workout, Split, LoggedWorkout

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Exercise)
admin.site.register(LoggedExercise)
admin.site.register(Workout)
admin.site.register(LoggedWorkout)
admin.site.register(Split)