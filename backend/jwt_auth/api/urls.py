from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path, include
from api import views 
from .views import UserViewSet, LivestockViewSet, OrderViewSet, NotificationViewSet, ProfileViewSet, MetricsView
from .views import TicketViewSet, FeedbackViewSet, FarmerCommitmentViewSet, ProfitSharingViewSet, ProfitDistributionViewSet
from .views import SalesAnalysisView, CustomerAnalysisView, PerformanceMetricsView, UserListView
from .views import overview_dashboard, ProductDashboardView, get_user_role, ApplicationCreateView, ProductDetailView
from .views import OrderManagementView, CustomerOrderView
from .views import resend_verification_email
from .views import ContactFormView


from rest_framework.routers import DefaultRouter


router = DefaultRouter()
# router.register(r'customers', CustomerViewSet)
router.register(r'livestock', LivestockViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'notifications', NotificationViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'tickets', TicketViewSet)
router.register(r'customers', UserViewSet)
router.register(r'feedback', FeedbackViewSet)
router.register(r'profit-sharing', ProfitSharingViewSet)
router.register(r'farmer-commitments', FarmerCommitmentViewSet)
router.register(r'profit-distributions', ProfitDistributionViewSet)


urlpatterns = [
    # path("api/",),
    path('resend-verification-email/', resend_verification_email, name='resend-verification-email'),
    path("token/", views.MyTokenObtainPairView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("test/", views.testEndPoint, name="test"),
    path('metrics/', MetricsView.as_view(), name='metrics'),
    path('sales-analytics/', SalesAnalysisView.as_view(), name='sales-analytics'),
    path('customer-analytics/', CustomerAnalysisView.as_view(), name='customer-analytics'),
    path('operational-performance/', PerformanceMetricsView.as_view(), name='operational-performance'),
    path('', include(router.urls)),
    path('route/', views.getRoutes),
    path('overview/', overview_dashboard, name='overview'),
    path('product-dashboard/', ProductDashboardView.as_view(), name='product-dashboard'),
    path('get_user_role/', get_user_role, name='get-user-role'),
    path('products/', views.getProduct, name='products'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'), # for deleting and editing 
    path('applications/create/', ApplicationCreateView.as_view(), name='application-create'),
    path('metrics/users/', views.user_metrics, name='user-metrics'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('orders/', CustomerOrderView.as_view(), name='order-list'),
    path('admin/orders/', OrderManagementView.as_view(), name='order-management'),
    path('contact/', ContactFormView.as_view(), name='contact_form'),
    path("initialize-payment/", views.initialize_payment, name="initialize_payment"),
    path("verify-payment/<str:reference>/", views.verify_payment, name="verify_payment"),
]
