# permissions.py
from rest_framework.permissions import BasePermission

# class IsProfileAdmin(BasePermission):
#     """
#     Custom permission to allow access only to users with is_admin=True in their profile.
#     """
#     def has_permission(self, request, view):
#         # Check if the user is authenticated and has a Profile
#         if request.user.is_authenticated and hasattr(request.user, 'profile'):
#             return request.user.profile.is_admin
#         return False

class IsAdminPermission(BasePermission):
    """
    Custom permission to only allow admin users to access the view.
    """
    def has_permission(self, request, view):
        # Check if the user has is_admin set to True
        return request.user.is_authenticated and request.user.is_admin