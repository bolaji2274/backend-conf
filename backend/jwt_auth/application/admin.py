from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import CustomerProfile, Product, Application

admin.site.register(CustomerProfile)
admin.site.register(Product)
admin.site.register(Application)
