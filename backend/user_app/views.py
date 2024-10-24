from django.shortcuts import render
from rest_framework.permissions import AllowAny,IsAuthenticated
from user_app.permissions import IsSuperUser
from rest_framework.generics import CreateAPIView,RetrieveUpdateAPIView,ListAPIView,RetrieveUpdateDestroyAPIView
from user_app.serializers import UserSerializer,UserListSerializer
from user_app.models import CustomUser

# Create your views here.

class UserRegistrationView(CreateAPIView):
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

class UserDetailsView(RetrieveUpdateAPIView):
    serializer_class=UserSerializer
    permission_classes=[IsAuthenticated]

    def get_object(self):
        return self.request.user

class UserListView(ListAPIView):
    queryset = CustomUser.objects.filter(is_superuser=False)
    serializer_class = UserListSerializer
    permission_classes = [IsSuperUser]  # Only allow superusers to access this view

class UpdateUserStatusView(RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.filter(is_superuser=False)
    serializer_class=UserListSerializer
    permission_classes=[IsSuperUser]