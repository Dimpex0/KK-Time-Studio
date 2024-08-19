from django.urls import path

from .views import LoginViewAPI, LogoutViewAPI, RegisterViewAPI, ActivateViewAPI, CheckSessionViewAPI

urlpatterns = [
    path('login/', LoginViewAPI.as_view()),
    path('logout/', LogoutViewAPI.as_view()),
    path('register/', RegisterViewAPI.as_view()),
    path('activate/<uidb64>/<token>/', ActivateViewAPI.as_view()),
    path('check-session/', CheckSessionViewAPI.as_view()),
]
