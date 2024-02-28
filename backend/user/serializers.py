from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'full_name',  # Ensure this field exists in your User model
            'username',
            'phone_number',  # Ensure this field exists in your User model
            'email',
            'password',
        )
        extra_kwargs = {
            'password': {
                'write_only': True
            },
            # If you want to make the email field read-only after creation, for example
            'email': {
                'read_only': True
            }
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # Create the user instance
        instance = self.Meta.model(**validated_data)

        # Set the password
        if password is not None:
            instance.set_password(password)

        # Save the user instance
        instance.save()
        return instance

    def validate(self, attrs):
        # Custom validation for your fields
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "This email is already in use."})

        return attrs
