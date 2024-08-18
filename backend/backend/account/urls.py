from django.urls import path

from .views import LoginViewAPI, LogoutViewAPI, RegisterViewAPI

urlpatterns = [
    path('login/', LoginViewAPI.as_view()),
    path('logout/', LogoutViewAPI.as_view()),
    path('register/', RegisterViewAPI.as_view()),
]
