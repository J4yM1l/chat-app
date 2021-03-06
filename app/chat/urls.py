from django.urls import path
from django.shortcuts import redirect
from chat.views import index, loginuser, logoutuser, MessageView, ChannelView, UserView

urlpatterns = [
    path('', lambda request: redirect('home/', permanent=False)),
    path('home/', loginuser),
    path('api/', index),
    path('api/logout/',logoutuser),
    path('api/user/', UserView.as_view()),
    path('api/channels/', ChannelView.as_view()),
    path('api/<slug:channel_url>/messages/', MessageView.as_view()),
]