from django.urls import path, include
from api import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('exercises', views.ExerciseList.as_view()),
    path('exercises/<pk>', views.ExerciseDetail.as_view()),
    path('logged_exercises', views.LoggedExerciseList.as_view()),
    path('logged_exercises/<user>/<pk>', views.LoggedExerciseDetail.as_view()),
    path('workouts', views.WorkoutList.as_view()),
    path('workouts/user/<pk>', views.UserWorkoutList.as_view()),
    path('workouts/<pk>', views.WorkoutDetail.as_view()),
    path('splits', views.SplitList.as_view()),
    path('splits/<pk>', views.SplitDetail.as_view()),
    path('logged_workout', views.LoggedWorkoutList.as_view()),
    path('logged_workout/<pk>', views.LoggedWorkoutDetail.as_view()),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('users/<pk>', views.CurrentUserView.as_view()),
]