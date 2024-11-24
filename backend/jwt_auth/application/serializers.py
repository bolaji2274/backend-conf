from rest_framework import serializers
from .models import Application, Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'available_quantity', 'unit_price']

class ApplicationSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = Application
        fields = ['id', 'product', 'quantity', 'status', 'admin_response', 'profit_sharing_ratio', 'created_at']
