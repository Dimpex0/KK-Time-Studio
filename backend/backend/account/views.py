from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model

from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse

from django.core.mail import send_mail
from django.conf import settings

UserModel = get_user_model()

# Create your views here.

# --------------------- REGISTRAION ------------- LOGIN ------------- LOGOUT ---------------------
class LoginViewAPI(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request=request, email=email, password=password)
        login(request, user)
        return Response({'test': 'test'}, status=200)
    
    
class LogoutViewAPI(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    
    def post(self, request):
        logout(request)
        return Response({'logout': 'yes'}, status=200)
    
class RegisterViewAPI(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = UserModel.objects.create_user(email=email, password=password)
        send_activation_email(user)
        return Response({}, status=204)
        
    
def send_activation_email(user):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    activation_url = f"{settings.DOMAIN}/account/activate/{uid}/{token}/"

    subject = "Activate your account"
    message = f"Hi {user.email},\n\nPlease click the link below to activate your account:\n{activation_url}"
    
    email = user.email
    
    send_mail(
        subject=subject,
        message=message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[email]
    )
    

# END --------------------- REGISTRAION ------------- LOGIN ------------- LOGOUT --------------------- END
    