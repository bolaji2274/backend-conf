from django.shortcuts import render

from api.models import User, Profile, Livestock, Order, Notification, Ticket, Feedback, ProfitDistribution, ProfitSharing, FarmerCommitment
from api.serializer import MyTokenObtainPairSerializer, UserSerializer, RegisterSerializer, ProfileSerializer, LivestockSerializer, OrderSerializer, NotificationSerializer, TicketSerializer, FeedbackSerializer, ProfitDistributionSerializer, ProfitSharingSerializer, FarmerCommitmentSerializer
from rest_framework import viewsets, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status, permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from django.utils import timezone
from datetime import timedelta
from rest_framework import status
from .permissions import IsProfileAdmin
from django.shortcuts import get_object_or_404
from django.db.models import Count, Sum
from .models import Sale, Product, Profile, User, Application, ContactMessage
from .serializer import ProductSerializer, ApplicationSerializer, ContactMessageSerializer
from django.core.mail import send_mail
from rest_framework.throttling import AnonRateThrottle
import logging

from rest_framework.decorators import api_view
# views.py
import requests
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.response import Response
from .utils import send_verification_email  # Assuming you have the email function here

@api_view(['POST'])
def resend_verification_email(request):
    user = request.user
    if not user.is_active:
        send_verification_email(user, request)
        return Response({"message": "Verification email sent."}, status=200)
    return Response({"message": "User is already verified."}, status=400)

@csrf_exempt
def initialize_payment(request):
    if request.method == "POST":
        email = request.POST.get("email")
        amount = int(request.POST.get("amount")) * 100  # Paystack expects amount in kobo

        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json",
        }
        data = {
            "email": email,
            "amount": amount,
        }
        response = requests.post(
            "https://api.paystack.co/transaction/initialize", headers=headers, json=data
        )
        return JsonResponse(response.json())
# views.py
@csrf_exempt
def verify_payment(request, reference):
    headers = {
        "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
        "Content-Type": "application/json",
    }
    response = requests.get(
        f"https://api.paystack.co/transaction/verify/{reference}", headers=headers
    )
    return JsonResponse(response.json())


# from .products import products


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_user_role(request):
    user = request.user
    role = 'admin' if user.is_staff else 'customer'
    data = {'role': role}
    return Response(data)




#   product 
@api_view(['GET'])
@permission_classes([AllowAny])
def getProduct(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# class ApplicationCreateView(APIView):
#     permission_classes = ([AllowAny])

#     def post(self, request):
#         serializer = ApplicationSerializer(data=request.data)
#         if serializer.is_valid():
#             # Attach the logged-in user as the customer
#             serializer.save(customer=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


logger = logging.getLogger(__name__)

# class ApplicationCreateView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def post(self, request):
#         product_id = request.data.get('product')
#         quantity = request.data.get('quantity')

#         # Ensure product exists and check stock
#         product = get_object_or_404(Product, id=product_id)
#         if product.stock < int(quantity):
#             return Response({"error": "Insufficient stock"}, status=status.HTTP_400_BAD_REQUEST)
        
#         # Create the application
#         application = Application.objects.create(
#             customer=request.user,
#             product=product,
#             quantity=quantity,
#             status='Pending'
#         )

#         # Reduce stock of the product
#         product.stock -= int(quantity)
#         product.save()

#         return Response(ApplicationSerializer(application).data, status=status.HTTP_201_CREATED)
    
class ApplicationCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        logger.info("Received request to create application.")

        product_id = request.data.get('product')
        quantity = request.data.get('quantity')

        logger.debug(f"Product ID: {product_id}, Quantity: {quantity}")

        # Ensure product exists and check stock
        product = get_object_or_404(Product, id=product_id)
        
        if product.stock < int(quantity):
            logger.warning(f"Insufficient stock for Product ID: {product_id}. Requested: {quantity}, Available: {product.stock}")
            return Response({"error": "Insufficient stock"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create the application
        application = Application.objects.create(
            customer=request.user,
            product=product,
            quantity=quantity,
            status='Pending'
        )

        # Automatically create an Order associated with this application
        order = Order.objects.create(
            application=application,
            status='Pending'
        )

        logger.info(f"Application created: {application.id} with Order ID: {order.id} for Product ID: {product_id}, Quantity: {quantity}")

        # Reduce stock of the product
        product.stock -= int(quantity)
        product.save()

        return Response({
            "application": ApplicationSerializer(application).data,
            "order": OrderSerializer(order).data
        }, status=status.HTTP_201_CREATED)


    
class CustomerOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch orders related only to the authenticated customer
        orders = Order.objects.filter(application__customer=request.user)
        total_orders = orders.count()
        pending_orders = orders.filter(status="Pending").count()
        completed_orders = orders.filter(status="Completed").count()

        # Summary for this customer's orders
        summary = {
            "total_orders": total_orders,
            "pending_orders": pending_orders,
            "completed_orders": completed_orders,
        }
        
        serializer = OrderSerializer(orders, many=True)
        return Response({
            "orders": serializer.data,
            "summary": summary
        }, status=status.HTTP_200_OK)

    def delete(self, request, pk=None):
        try:
            # Ensure only pending orders of the specific customer can be cancelled
            order = Order.objects.get(pk=pk, application__customer=request.user)
            if order.status == 'Pending':
                order.status = 'Cancelled'
                order.save()
                return Response({"detail": "Order cancelled"}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Only pending orders can be cancelled"}, status=status.HTTP_400_BAD_REQUEST)
        except Order.DoesNotExist:
            return Response({"detail": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(application__customer=request.user)
        total_orders = orders.count()
        pending_orders = orders.filter(status="Pending").count()
        completed_orders = orders.filter(status="Completed").count()

        summary = {
            "total_orders": total_orders,
            "pending_orders": pending_orders,
            "completed_orders": completed_orders,
        }
        
        serializer = OrderSerializer(orders, many=True)
        return Response({
            "orders": serializer.data,
            "summary": summary
        }, status=status.HTTP_200_OK)

    def delete(self, request, pk=None):
        try:
            order = Order.objects.get(pk=pk, application__customer=request.user)
            if order.status == 'Pending':
                order.status = 'Cancelled'
                order.save()
                return Response({"detail": "Order cancelled"}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Only pending orders can be cancelled"}, status=status.HTTP_400_BAD_REQUEST)
        except Order.DoesNotExist:
            return Response({"detail": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

class OrderManagementView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        # Get all orders for admin management
        orders = Order.objects.all()
        
        total_orders = orders.count()
        pending_orders = orders.filter(status="Pending").count()
        completed_orders = orders.filter(status="Completed").count()
        total_revenue = orders.aggregate(total=Sum('total_price'))['total'] or 0.00

        summary = {
            "total_orders": total_orders,
            "pending_orders": pending_orders,
            "completed_orders": completed_orders,
            "total_revenue": total_revenue,
        }
        
        serializer = OrderSerializer(orders, many=True)
        return Response({
            "orders": serializer.data,
            "summary": summary
        }, status=status.HTTP_200_OK)

    def post(self, request):
        # Admin can update order status (e.g., Accept, Reject)
        order_id = request.data.get("order_id")
        status_choice = request.data.get("status")

        order = get_object_or_404(Order, id=order_id)
        if status_choice in dict(Order.STATUS_CHOICES):
            order.status = status_choice
            order.save()
            return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)
        return Response({"error": "Invalid status choice"}, status=status.HTTP_400_BAD_REQUEST)

# Dashboard Start
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_pending_applications(request):
    user = request.user
    pending_applications = Application.objects.filter(customer=user, status="Pending")
    serializer = ApplicationSerializer(pending_applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# class OverviewDashboardView(APIView):
   
#     def get(self, request):
#         # Total sales (sum of all sales)
#         total_sales = Sale.objects.aggregate(Sum('total_price'))['total_price__sum'] or 0

#         # New users (e.g., joined within a specific timeframe)
#         new_users = User.objects.filter(date_joined__gte='2024-01-01').count() or 0

#         # Total products
#         total_products = Product.objects.count() or 0

#         # Total orders (sales count)
#         total_orders = Sale.objects.count() or 0

#         # Conversion rate (orders divided by new users)
#         conversion_rate = ((total_orders / new_users) * 100 if new_users > 0 else 0) or 0
#         data = {
#             'total_sales': total_sales,
#             'new_users': new_users,
#             'total_products': total_products,
#             'conversion_rate': conversion_rate
#         }
#         # Return the response using serialized data
#         return Response(data)
@api_view(['GET'])
@permission_classes([AllowAny])
def overview_dashboard(request):
    # Total sales (sum of all sales)
    total_sales = Sale.objects.aggregate(Sum('total_price'))['total_price__sum'] or 0

    # New users (e.g., joined within a specific timeframe)
    new_users = User.objects.filter(date_joined__gte='2024-01-01').count() or 0

    # Total products
    total_products = Product.objects.count() or 0

    # Total orders (sales count)
    total_orders = Sale.objects.count() or 0

    # Conversion rate (orders divided by new users)
    conversion_rate = ((total_orders / new_users) * 100 if new_users > 0 else 0) or 0
    
    data = {
        'total_sales': total_sales,
        'new_users': new_users,
        'total_products': total_products,
        'conversion_rate': conversion_rate
    }
    
    # Return the response using serialized data
    return Response(data)
# class ProductDashboardView(APIView):
#     permission_classes = [AllowAny]
#     def get(self, request):
#         # Total products
#         total_products = Product.objects.count() or 0

#         # Top selling product (product with the highest sales)
#         top_selling_product = Product.objects.order_by('-sales').first()
#         # Check if a top selling product exists and serialize it
#         top_selling_product_serialized = ProductSerializer(top_selling_product).data if top_selling_product else None
        
#         # Low stock products (let's define low stock as anything below 10 units)
#         low_stock_products = Product.objects.filter(stock__lt=10)

#         # Total revenue from all products (sum of all sales total)
#         total_revenue = Sale.objects.aggregate(Sum('total_price'))['total_price__sum'] or 0

#         # Product list
#         product_list = Product.objects.all()

#         # Serialize data
#         low_stock_products_serialized = ProductSerializer(low_stock_products, many=True).data
#         product_list_serialized = ProductSerializer(product_list, many=True).data
        
#         # Ensure any other null values in the serialized data are replaced with 0
#         if top_selling_product_serialized:
#             top_selling_product_serialized = {k: v if v is not None else 0 for k, v in top_selling_product_serialized.items()}

#         product_list_serialized = [
#             {k: v if v is not None else 0 for k, v in product.items()} for product in product_list_serialized
#         ]
        
#         data = {
#             'total_products': total_products,
#             'top_selling_product': top_selling_product_serialized,
#             'low_stock_products': low_stock_products_serialized,
#             'total_revenue': total_revenue,
#             'product_list': product_list_serialized
#         }
        
#         # Return the response
#         return Response(data)
class ProductDashboardView(APIView):
    permission_classes = ([AllowAny])

    def get(self, request):
        # Total products
        total_products = Product.objects.count() or 0

        # Top selling product (product with the highest sales)
        top_selling_product = Product.objects.order_by('-sales').first()
        top_selling_product_serialized = ProductSerializer(top_selling_product).data if top_selling_product else None

        # Low stock products (defined as anything below 10 units)
        low_stock_products = Product.objects.filter(stock__lt=10)
        low_stock_products_serialized = ProductSerializer(low_stock_products, many=True).data

        # Total revenue
        total_revenue = sum(
            [application.product.price * application.quantity for application in Application.objects.all()]
        )

        # Product list
        product_list = Product.objects.filter(stock__gt=0)  # Only show products in stock
        product_list_serialized = ProductSerializer(product_list, many=True).data
        
        # Replace null values
        if top_selling_product_serialized:
            top_selling_product_serialized = {k: v if v is not None else 0 for k, v in top_selling_product_serialized.items()}

        product_list_serialized = [
            {k: v if v is not None else 0 for k, v in product.items()} for product in product_list_serialized
        ]

        data = {
            'total_products': total_products,
            'top_selling_product': top_selling_product_serialized,
            'low_stock_products': low_stock_products_serialized,
            'total_revenue': total_revenue,
            'product_list': product_list_serialized
        }
        
        return Response(data)
class ProductDetailView(APIView):
    def get(self, request, pk, format=None):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk, format=None):
        try:
            product = Product.objects.get(pk=pk)
            product.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        # User Metrics Now
@api_view(['GET'])
@permission_classes([AllowAny])# Allow GET requests without authentication
def user_metrics(request):
    today = timezone.now().date()
    one_week_ago = timezone.now() - timedelta(days=7)
    one_month_ago = timezone.now() - timedelta(days=30)
    
    total_users = User.objects.count()
    new_users_today = User.objects.filter(date_joined__date=today).count()
    active_users = User.objects.filter(last_login__gte=one_week_ago).count()
    
    # Calculate Churn Rate as % of users who haven’t logged in for 30 days
    inactive_users = User.objects.filter(last_login__lt=one_month_ago).count()
    churn_rate = (inactive_users / total_users * 100) if total_users > 0 else 0

    metrics = {
        'total_users': total_users,
        'new_users_today': new_users_today,
        'active_users': active_users,
        'churn_rate': churn_rate
    }
    
    return Response(metrics, status=200)  # Return the metrics with a 200 OK status

            # Get User List
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()  # Adjust queryset as needed
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    

class SalesDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        sales_data = Order.objects.values('created_at').annotate(total_sales=Sum('quantity'))
        return Response(sales_data)

            # Contact Form View 
class ContactFormView(APIView):
    permission_classes = [AllowAny]
    
    throttle_classes = [AnonRateThrottle]
    
    def get(self, request):
        messages = ContactMessage.objects.all().order_by('-created_at')
        serializer = ContactMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Send email notification
            send_mail(
                subject=f"New Contact Form Submission: {serializer.validated_data['name']}",
                message=f"Message from {serializer.validated_data['email']}:\n\n{serializer.validated_data['message']}",
                # from_email='noreply@nasfarm.com',
                from_email='hammedbolajihammed@gmail.com',
                recipient_list=['hbolaji348@gmail.com', 'hammedbolajihammed@gmail.com'],
            )
            return Response({"message": "Message sent successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InventoryTrendsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        inventory_data = Livestock.objects.values('created_at').annotate(total_inventory=Sum('available_quantity'))
        return Response(inventory_data)

class CustomerInsightsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        customer_data = User.objects.values('date_joined').annotate(total_customers=Count('id'))
        return Response(customer_data)

class SalesAnalysisView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        sales_data = Order.objects.values('created_at').annotate(total_sales=Sum('quantity'))
        return Response(sales_data)

class CustomerAnalysisView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        customer_data = User.objects.values('date_joined').annotate(total_customers=Count('id'))
        return Response(customer_data)

class InventoryAnalysisView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        inventory_data = Livestock.objects.values('created_at').annotate(total_inventory=Sum('available_quantity'))
        return Response(inventory_data)

class PerformanceMetricsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_customers = User.objects.count()
        total_orders = Order.objects.count()
        total_livestock = Livestock.objects.count()

        data = {
            'total_customers': total_customers,
            'total_orders': total_orders,
            'total_livestock': total_livestock,
        }
        return Response(data)
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
    
class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
class LivestockViewSet(viewsets.ModelViewSet):
    queryset = Livestock.objects.all()
    serializer_class = LivestockSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'type']
    ordering_fields = ['name', 'type', 'available_quantity', 'created_at']
    pagination_class = StandardResultsSetPagination

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['message', 'notification_type']
    ordering_fields = ['created_at']
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Notification.objects.all()  # Admin sees all notifications
        return Notification.objects.filter(customer=user)  # Customer sees their own notifications
class ProfitSharingViewSet(viewsets.ModelViewSet):
    queryset = ProfitSharing.objects.all()
    serializer_class = ProfitSharingSerializer

class FarmerCommitmentViewSet(viewsets.ModelViewSet):
    queryset = FarmerCommitment.objects.all()
    serializer_class = FarmerCommitmentSerializer

class ProfitDistributionViewSet(viewsets.ModelViewSet):
    queryset = ProfitDistribution.objects.all()
    serializer_class = ProfitDistributionSerializer
class MetricsView(APIView):
    def get(self, request):
        total_livestock = Livestock.objects.count()
        pending_orders = Order.objects.filter(status='Pending').count()
        approved_orders = Order.objects.filter(status='Approved').count()

        data = {
            'totalLivestock': total_livestock,
            'pendingOrders': pending_orders,
            'approvedOrders': approved_orders,
        }
        return Response(data)
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = ([AllowAny])
    serializer_class = RegisterSerializer
    
    
# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)


    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    if request.method == 'GET':
        context = f"Hey {request.user}, You are seeing a GET response"
        return Response({'response': context}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        context = f"Hey ! {request.user}, your text is {text}"
        return Response({'response': context}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
        
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        # data = f"Congratulation {request.user}, your API just responded to GET request"
        data = f"Congratulation {request.user}, you just login to your dashboard"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)