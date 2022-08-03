from rest_framework import serializers
from .models import Exercise, LoggedExercise, Workout, Split, LoggedWorkout, User
# from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'muscles', 'equipment']

class LoggedExerciseSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = LoggedExercise
        fields = ['id', 'last_done', 'last_set', 'max_set', 'owner', 'exercise']

class WorkoutSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Workout
        fields = ['id', 'name', 'exercises', 'sets_per', 'rep_ranges', 'last_done', 'owner']

class LoggedWorkoutSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = LoggedWorkout
        fields = ['id', 'name', 'workout', 'date', 'owner']

class SplitSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Split
        fields = ['id', 'name', 'M', 'T', 'W', 'Th', 'F', 'S', 'Su', 'owner']

class UserSerializer(serializers.ModelSerializer):
    exercises = serializers.PrimaryKeyRelatedField(many=True, queryset=Exercise.objects.all())
    workouts = serializers.PrimaryKeyRelatedField(many=True, queryset=Workout.objects.all())
    logged_workouts = serializers.PrimaryKeyRelatedField(many=True, queryset=LoggedWorkout.objects.all())
    splits = serializers.PrimaryKeyRelatedField(many=True, queryset=Split.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'workouts', 'exercises', 'logged_workouts', 'splits']

