from django.shortcuts import render

# Create your views here.

from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Application, Product, CustomerProfile
from .serializers import ApplicationSerializer, ProductSerializer

# Submit an Application
class SubmitApplicationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        customer = get_object_or_404(CustomerProfile, user=request.user)
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity')

        product = get_object_or_404(Product, id=product_id)

        if product.available_quantity < quantity:
            return Response({"error": "Insufficient stock available"}, status=400)

        application = Application.objects.create(
            customer=customer,
            product=product,
            quantity=quantity
        )
        return Response({"message": "Application submitted successfully", "application_id": application.id})

# List Applications (Pending/Previous)
class ListApplicationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        customer = get_object_or_404(CustomerProfile, user=request.user)
        applications = Application.objects.filter(customer=customer)
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)

class ReviewApplicationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, application_id):
        application = get_object_or_404(Application, id=application_id)
        status = request.data.get('status')
        admin_response = request.data.get('admin_response', '')
        profit_sharing_ratio = request.data.get('profit_sharing_ratio', None)

        if status not in ['approved', 'declined']:
            return Response({"error": "Invalid status"}, status=400)

        application.status = status
        application.admin_response = admin_response
        if profit_sharing_ratio:
            application.profit_sharing_ratio = profit_sharing_ratio
        application.save()

        return Response({"message": "Application reviewed successfully"})
