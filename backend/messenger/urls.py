from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register_user, name = "register"),
    path("login/", views.login_user, name = "login"),
    path("logout/", views.logout_user, name = "logout"),
    path("get_messages/<str:username>/", views.get_messages, name = "get_messages"),
    path("get_users/", views.get_users, name = "get_users"),
    path("send_message/", views.send_message, name = "send_message"),
]