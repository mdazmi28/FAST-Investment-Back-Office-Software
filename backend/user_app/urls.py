
from django.urls import path
from user_app.views import UserRegistrationView,UserDetailsView,UserListView,UpdateUserStatusView

urlpatterns = [
    path('user-register/',UserRegistrationView.as_view(),name='user_registration'),
    path('user-profile/',UserDetailsView.as_view(),name='user_profile'),
    path('admin/users/',UserListView.as_view(),name='user_list'),
    path('admin/users/<int:pk>/',UpdateUserStatusView.as_view(),name='user_list'),
    
]