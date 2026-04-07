from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

def index(request):
    return HttpResponse("Hello, world.")

def test(request):
    if request.method != "GET":
        return JsonResponse({"error": "GET request required!"}, status = 400)
    return JsonResponse({"message": "Hello, world!"}, status = 200)