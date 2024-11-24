from django.urls import path
from .views import SubmitApplicationView, ListApplicationsView

urlpatterns = [
    path('applications/submit/', SubmitApplicationView.as_view(), name='submit_application'),
    path('applications/list/', ListApplicationsView.as_view(), name='list_applications'),
]
