import json
from .models import User
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt

# def test(request):
#     if request.method != "GET":
#         return JsonResponse({"message": "GET request required!"}, status = 400)
#     return JsonResponse({"message": "Hello, world!"}, status = 200)

@csrf_exempt
def register_user(request):
    if request.method != "POST":
        return JsonResponse({"message": "POST request required!"}, status = 400)
    else:
        try:
            data = json.loads(request.body)
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")
            confirmation = data.get("confirmation")
            if password != confirmation:
                return JsonResponse({"message": "Passwords do not match!"}, status = 400)
            user = User.objects.create_user(username = username, email = email, password = password)
            login(request, user)
            return JsonResponse({"message": "User registered successfully!"}, status = 201)
        except IntegrityError:
            return JsonResponse({"message": "Username or email is already taken!"}, status = 400)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status = 400)

@csrf_exempt
def login_user(request):
    if request.method != "POST":
        return JsonResponse({"message": "POST request required!"}, status = 400)
    else:
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
            user = authenticate(request, username = username, password = password)
            if user is not None:
                login(request, user)
                return JsonResponse({"message": "Login successful!"}, status = 200)
            else:
                return JsonResponse({"message": "Invalid credentials!"}, status = 401)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status = 400)

@csrf_exempt
def logout_user(request):
    logout(request)
    return JsonResponse({"message": "Logout successful!"}, status = 200)