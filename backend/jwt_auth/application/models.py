from django.db import models
from api.models import User


# Create your models here.
class CustomerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    address = models.TextField()
    experience_years = models.IntegerField()
    farm_location = models.CharField(max_length=255)
    nearby_landmark = models.CharField(max_length=255)
    farming_type = models.CharField(
        max_length=50,
        choices=[
            ('fish', 'Fish'),
            ('broiler', 'Broiler'),
            ('layers', 'Layers'),
            ('other', 'Other'),
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

# Product Inventory Model
class Product(models.Model):
    CATEGORY_CHOICES = [
        ('livestock', 'Livestock'),
        ('feed', 'Feed'),
        ('drug', 'Drug'),
        ('other', 'Other'),
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    available_quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.category}"

# Customer Application Model
class Application(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('declined', 'Declined'),
    ]
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')
    admin_response = models.TextField(blank=True, null=True)
    profit_sharing_ratio = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.user.username} - {self.product.name} ({self.status})"

    def save(self, *args, **kwargs):
        if self.status == 'approved' and self._state.adding is False:
            product = self.product
            product.available_quantity -= self.quantity
            product.save()
        super().save(*args, **kwargs)
