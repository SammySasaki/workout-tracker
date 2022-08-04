from django.shortcuts import render
from rest_framework import generics, status
from .models import Workout, Exercise, LoggedExercise, Split, LoggedWorkout, User
from .serializers import WorkoutSerializer, ExerciseSerializer, LoggedExerciseSerializer, SplitSerializer, LoggedWorkoutSerializer, UserSerializer
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from django.http import Http404

class ExerciseList(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ExerciseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class LoggedExerciseList(generics.ListCreateAPIView):
    queryset = LoggedExercise.objects.all()
    serializer_class = LoggedExerciseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class LoggedExerciseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LoggedExercise.objects.all()
    serializer_class = LoggedExerciseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get_object(self, pk):
        try:
            return Exercise.objects.get(pk=pk)
        except Exercise.DoesNotExist:
            raise Http404
    def get(self, request, user, pk):
        refexercise = self.get_object(pk)
        loggedExercise = LoggedExercise.objects.filter(exercise=refexercise.id).filter(owner__username=user)
        serializer = LoggedExerciseSerializer(loggedExercise, many=True)
        return Response(serializer.data)
    def put(self, request, user, pk):
        refexercise = self.get_object(pk)
        loggedExercise = LoggedExercise.objects.filter(exercise=refexercise.id).filter(owner__username=user).first()
        serializer = LoggedExerciseSerializer(loggedExercise, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WorkoutList(generics.ListCreateAPIView):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class UserWorkoutList(APIView):
    def get(self, request,  pk):
        workouts = Workout.objects.filter(owner__username=pk)
        serializer = WorkoutSerializer(workouts, many=True)
        return Response(serializer.data)

class WorkoutDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SplitList(generics.ListCreateAPIView):
    queryset = Split.objects.all()
    serializer_class = SplitSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class SplitDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Split.objects.all()
    serializer_class = SplitSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get_object(self, pk):
        try:
            return Split.objects.get(owner__username=pk)
        except Split.DoesNotExist:
            raise Http404
    def get(self, request, pk):
        split = self.get_object(pk)
        serializer = SplitSerializer(split)
        return Response(serializer.data)
    def put(self, request, pk):
        split = Split.objects.filter(owner__username=pk)[0]
        serializer = SplitSerializer(split, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoggedWorkoutList(generics.ListCreateAPIView):
    queryset = LoggedWorkout.objects.all()
    serializer_class = LoggedWorkoutSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class LoggedWorkoutDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LoggedWorkout.objects.all()
    serializer_class = LoggedWorkoutSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        loggedWorkouts = LoggedWorkout.objects.filter(owner__username=pk)
        serializer = LoggedWorkoutSerializer(loggedWorkouts, many=True)
        return Response(serializer.data)

class CurrentUserView(APIView):
    def get(self, request, pk):
        user = Token.objects.get(key=pk).user
        serializer = UserSerializer(user)
        return Response(serializer.data)

