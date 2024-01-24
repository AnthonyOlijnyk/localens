from rest_framework.views import APIView

from .models import User
from .serializers import UserSerializer
from .forms import SignupForm

from .utils.signup import send_email_confirmation
from .utils.login import create_token
from .utils.constants import NO_USER_WITH_EMAIL, INCORRECT_PASSWORD

from core.network import make_success_response, make_error_response

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
