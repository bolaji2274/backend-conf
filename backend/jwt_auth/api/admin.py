from django.contrib import admin
from api.models import User, Profile
from .models import Livestock, Order, Notification, Profile, Product, Application
from django.contrib import admin
from .models import ContactMessage



# Register the Livestock model


admin.site.site_header = 'Nasfarm Admin Dashboard'

@admin.register(Livestock)
class LivestockAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'available_quantity']
    search_fields = ['name', 'type']
    
# @admin.register(Application)
# Register the Order model

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['get_product_name', 'get_quantity', 'status', 'created_at']
    search_fields = ['application__product__name', 'status']

    def get_product_name(self, obj):
        return obj.application.product.name
    get_product_name.short_description = 'Product Name'

    def get_quantity(self, obj):
        return obj.application.quantity
    get_quantity.short_description = 'Quantity'
# Register the Notification model
@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['customer', 'message', 'created_at']
    search_fields = ['customer__email', 'message']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'service', 'created_at')
    search_fields = ('name', 'email', 'message')
# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'farm_branch_name', 'phone_number']
    search_fields = ['email', 'farm_branch_name', 'phone_number']
class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name', 'verified']
    


    

# admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Product)

