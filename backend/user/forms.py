from django import forms
from django.core.exceptions import ValidationError

class SignupForm(forms.Form):
    full_name = forms.CharField(label='Full Name', max_length=150)
    username = forms.CharField(label='Username', max_length=100)
    phone_number = forms.CharField(label='Phone Number', max_length=15)  # Adjust max_length as needed
    email = forms.EmailField(label='Email', max_length=100)
    password = forms.CharField(label='Password', max_length=100, widget=forms.PasswordInput)
    confirm_password = forms.CharField(label='Confirm Password', max_length=100, widget=forms.PasswordInput)

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")

        if password != confirm_password:
            self.add_error('confirm_password', "Password and Confirm Password does not match")

        return cleaned_data