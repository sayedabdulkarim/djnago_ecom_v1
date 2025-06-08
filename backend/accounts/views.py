from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

# Register
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# Login (JWT Token)
from rest_framework_simplejwt.views import TokenObtainPairView

# Logout (client should just delete token; optional blacklist for advanced)
class LogoutView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        return Response(status=status.HTTP_200_OK)
