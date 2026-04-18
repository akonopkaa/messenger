import json
from .models import User, Message
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt

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

@csrf_exempt
def get_messages(request, username):
    if not request.user.is_authenticated:
        return JsonResponse({"message": "Unauthorized!"}, status = 401)
    if request.method != "GET":
        return JsonResponse({"message": "GET request required!"}, status = 400)
    try:
        offset = int(request.GET.get("offset", 0))
        other_user = User.objects.get(username = username)
        sent = list(Message.objects.filter(sender = request.user, receiver = other_user))
        received = list(Message.objects.filter(sender = other_user, receiver = request.user))
        all_messages = sorted(sent + received, key = lambda msg: msg.timestamp, reverse = True)
        chunk = all_messages[offset : offset + 10]
        chunk.reverse()
        messages_list = []
        for msg in chunk:
            messages_list.append({
                "id": msg.id, # type: ignore
                "sender": msg.sender.username,
                "receiver": msg.receiver.username,
                "content": msg.content,
            })
        return JsonResponse(messages_list, safe = False, status = 200)
    except User.DoesNotExist:
        return JsonResponse({"message": "User not found!"}, status = 404)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status = 400)
    
@csrf_exempt
def get_users(request):
    if not request.user.is_authenticated:
        return JsonResponse({"message": "Unauthorized!"}, status = 401)
    if request.method != "GET":
        return JsonResponse({"message": "GET request required!"}, status = 400)
    try:
        users = list(User.objects.exclude(id=request.user.id))
        all_users = []
        for user in users:
            all_users.append({
                "id": user.id, #type: ignore
                "username": user.username
            })
        return JsonResponse(all_users, safe = False, status = 200)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status = 400)
    
@csrf_exempt
def send_message(request):
    if not request.user.is_authenticated:
        return JsonResponse({"message": "Unauthorized!"}, status = 401)
    if request.method != "POST":
        return JsonResponse({"message": "POST request required!"}, status = 400)
    try:
        data = json.loads(request.body)
        receiver_username = data.get("receiver")
        content = data.get("content")
        
        if not receiver_username or not content:
            return JsonResponse({"message": "Receiver and content are required!"}, status = 400)
        receiver = User.objects.get(username = receiver_username)
        Message.objects.create(sender = request.user, receiver = receiver, content = content)
        return JsonResponse({"message": "Message sent successfully!"}, status = 201)
    except User.DoesNotExist:
        return JsonResponse({"message": "Receiver not found!"}, status = 404)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status = 400)