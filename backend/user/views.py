from rest_framework.views import APIView

from django.core.exceptions import ObjectDoesNotExist

from .models import User
from .serializers import UserSerializer
from .forms import SignupForm

from .utils.signup import send_email_confirmation
from .utils.login import create_token
from .utils.constants import (
    NO_USER_WITH_EMAIL,
    INCORRECT_PASSWORD,
    EMAIL_IN_USE,
    USERNAME_IN_USE
) 

from core.network import make_success_response, make_error_response
from core.authorization import get_user_id

class SignUpView(APIView):

    def post(self, request):
        form = SignupForm(request.data)

        if not form.is_valid():
            return make_error_response(form.errors)
        
        serializer = UserSerializer(data=form.cleaned_data)

        if not serializer.is_valid():
            return make_error_response(serializer.errors)
        
        email = request.data['email']
        
        serializer.save()
        send_email_confirmation(email)

        return make_success_response()
            

class LoginView(APIView):

    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        try:
            user = User.objects.get(email=email)

        except User.DoesNotExist:
            return make_error_response(NO_USER_WITH_EMAIL)
        
        if not user.check_password(password):
            return make_error_response(INCORRECT_PASSWORD)

        return make_success_response({ 'token': create_token(user.id) })
    
class UpdateEmail(APIView):
    def put(self, request):
        email = request.data['email']

        user = User.objects.get(pk=get_user_id(request))

        try:
            User.objects.get(email=email)
            return make_error_response(EMAIL_IN_USE)
        except ObjectDoesNotExist:
            user.email = email
            user.save()

            return make_success_response()
    
class UpdateUsername(APIView):
    def put(self, request):
        username = request.data['username']

        user = User.objects.get(pk=get_user_id(request))

        try:
            User.objects.get(username=username)
            return make_error_response(USERNAME_IN_USE)
        except ObjectDoesNotExist:
            user.username = username
            user.save()

            return make_success_response()
    
class UpdatePassword(APIView):
    def put(self, request):
        new_password = request.data['newPassword']
        current_password = request.data['currentPassword']

        user = User.objects.get(pk=get_user_id(request))

        if not user.check_password(current_password):
            return make_error_response(INCORRECT_PASSWORD)

        user.set_password(new_password)
        user.save()

        return make_success_response()
    
class GetUserDetails(APIView):
    def get(self, request):
        user = User.objects.get(pk=get_user_id(request))

        serializer = UserSerializer(user)

        return make_success_response({ 'user': serializer.data })
