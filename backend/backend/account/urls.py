from django.urls import path

from .views import LoginViewAPI

urlpatterns = [
    path('login/', LoginViewAPI.as_view()),
]
