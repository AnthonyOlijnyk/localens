from django.core.mail import send_mail
from django.conf import settings

def send_email_confirmation(email):
    send_mail(
        'Welcome to Localens!',
        'Thank you for making an account with Localens.',
        settings.EMAIL_HOST_USER,
        [email],
        fail_silently=False
    )
