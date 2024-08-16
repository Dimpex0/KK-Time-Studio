from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout

# Create your views here.
class LoginViewAPI(APIView):
    permission_classes = [AllowAny, ]
    
    def post(self, request):
        print(request.data)
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        print(user)
        # login(request, user)
        # logout(request, user)
        
        return Response({'test': 'test'}, status=200)