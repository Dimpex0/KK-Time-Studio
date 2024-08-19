from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model

from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str

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
        
        if user is not None:
            if not user.is_active:
                return Response({'message': 'Account not activate. Please check your e-mail.'}, status=428)
            
            is_admin = login_and_return_user(request, user)
            # TODO return user profile
            return Response({'message': 'Login successful.', 'isAdmin': is_admin}, status=202)
        else:
            return Response({'message': 'Wrong credentials.'}, status=400)
    
    
class LogoutViewAPI(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful.'}, status=200)
    
class RegisterViewAPI(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = UserModel.objects.create_user(email=email, password=password)
        except Exception:
            return Response({'message': 'User with this e-mail already exists.'}, status=400)
        
        try:
            send_activation_email(user)
        except Exception:
            # Deletes the user if email couldn't be sent for better UX
            UserModel.objects.get(pk=user.pk).delete()
            return Response({'message': "Couldn't send an activation e-mail. Please try again later."}, status=400)
        
        return Response({'message': "Registration successful. We've sent an activation link to your e-mail."}, status=201)
    
class CheckSessionViewAPI(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    
    def post(self, request):
        is_admin = login_and_return_user(request, request.user)
        return Response({'message': 'Session recreated.', 'isAdmin': is_admin}, status=201)
    
class ActivateViewAPI(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = UserModel.objects.get(pk=uid)
        except Exception:
            user = None
            
        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'message': 'Account activation successful.'}, status=202)
        
        return Response({'message': 'Activation link invalid'}, status=400)
        
        
    
def send_activation_email(user):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    activation_url = f"{settings.DOMAIN}/account/activate/{uid}/{token}/"

    # TODO create a custom template
    subject = "Activate your account"
    message = f"Hi {user.email},\n\nPlease click the link below to activate your account:\n{activation_url}"
    
    email = user.email

    send_mail(
        subject=subject,
        message=message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[email]
    )
    
def login_and_return_user(request, user):
    login(request, user)
    is_admin = user.is_superuser
    # TODO return profile
    return is_admin
    

# END --------------------- REGISTRAION ------------- LOGIN ------------- LOGOUT --------------------- END
    