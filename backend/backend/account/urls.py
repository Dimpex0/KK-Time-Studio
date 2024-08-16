from django.urls import path

from .views import LoginViewAPI, LogoutViewAPI

urlpatterns = [
    path('login/', LoginViewAPI.as_view()),
    path('logout/', LogoutViewAPI.as_view()),
]
