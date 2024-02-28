import statistics
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import User
from .serializers import UserSerializer
from .forms import SignupForm

from .utils.signup import send_email_confirmation
from .utils.login import create_token
from .utils.constants import NO_USER_WITH_EMAIL, INCORRECT_PASSWORD

from core.network import make_success_response, make_error_response

class SignUpView(APIView):
    def get(self, request):
        # Example response, adjust according to your needs
        return Response({"message": "Please send a POST request to sign up."})

    def post(self, request):
        # Using the SignupForm for validation
        form = SignupForm(request.data)

        if not form.is_valid():
            return make_error_response(form.errors)

        # Check if user already exists
        if User.objects.filter(email=form.cleaned_data['email']).exists():
            return Response({'error': 'Email is already in use.'}, status=statistics.HTTP_400_BAD_REQUEST)

        # Save the user data, with hashed password
        try:
            user = User.objects.create(
                full_name=form.cleaned_data['full_name'],
                username=form.cleaned_data['username'],
                country_code=form.cleaned_data['country_code'],
                phone_number=form.cleaned_data['phone_number'],
                email=form.cleaned_data['email'],
                password_hash=(form.cleaned_data['password'])
            )
            user.save()
        except ValidationError as e:
            # This captures any model validation errors
            return make_error_response(e.messages)

        # You might want to adjust this as per your `send_email_confirmation` function's requirements
        send_email_confirmation(user.email)

        return make_success_response({'message': 'User registered successfully.'})
            

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
