from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db.models.signals import post_save
from decimal import Decimal
# Create your models here.

class User(AbstractUser):
    
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100)
    first_name = models.CharField(max_length=155)
    last_name = models.CharField(max_length=155)
    farm_branch_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('customer', 'Customer'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='customer')
    is_admin = models.BooleanField(default=False)
    # is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    # is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    role = models.CharField(max_length=50, choices=[('admin', 'Admin'), ('customer', 'Customer')], default='customer')
    full_name = models.CharField(max_length=250)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    bio = models.CharField(max_length=100)
    image = models.ImageField(default='default.jpg', upload_to='user_images')
    verified = models.BooleanField(default=False)
    farm_branch_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    def __str__(self):
        return self.first_name
    
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
    
post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)


class Product(models.Model):
    CHOICES = [
        ('Broiler', 'Chicken'),
        ('Layer', 'Chicken'),
        ('Fish', 'Fish'),
        ('Broiler Feeds', 'Feeds'),
        ('Layers Feeds', 'Feeds'),
        ('Cat Fish', 'Fish'),
        ('Turkey', 'Turkey'),
        # Add other animal types as needed
    ]
    id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, choices=CHOICES)
    image = models.ImageField(upload_to='image' ,null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    stock = models.PositiveIntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    sales = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

                # Application for customer 
class Application(models.Model):
    # ANIMAL_CHOICES = [
    #     ('Broiler', 'Broiler'),
    #     ('Layer', 'Layer'),
    #     ('Fish', 'Fish'),
    #     ('Cat Fish', 'Fish'),
    #     # Add other animal types as needed
    # ]

    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applications")
    # animal_type = models.CharField(max_length=50, choices=ANIMAL_CHOICES)
    # product = models.ForeignKey()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  # Link to Product model
    quantity = models.PositiveIntegerField()
    feed_type = models.CharField(max_length=100)
    drug_requirements = models.CharField(max_length=200)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.customer.username} - {self.product.name}"
# class Order(models.Model):
#     customer = models.ForeignKey(User, on_delete=models.CASCADE)
#     livestock = models.ForeignKey(Livestock, on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField()
#     status = models.CharField(max_length=50)

class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Accepted', 'Accepted'),
        ('Rejected', 'Rejected'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]
    
    
    application = models.ForeignKey(Application, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(choices=STATUS_CHOICES, default='Pending', max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        # Calculate total price based on application product price and quantity
        # Convert quantity to an integer and ensure price is Decimal
        quantity = int(self.application.quantity) if isinstance(self.application.quantity, str) else self.application.quantity
        price = Decimal(self.application.product.price) if not isinstance(self.application.product.price, Decimal) else self.application.product.price

        self.total_price = price * quantity
        super(Order, self).save(*args, **kwargs)

    def __str__(self):
        return f"Order {self.id} - {self.status}"
class Sale(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Sale {self.id} - {self.total_price}'

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    service = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class ProfitSharing(models.Model):
    farmer = models.ForeignKey(User, on_delete=models.CASCADE)
    profit_ratio = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class FarmerCommitment(models.Model):
    farmer = models.ForeignKey(User, on_delete=models.CASCADE)
    commitment = models.CharField(max_length=255)
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Completed', 'Completed')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class ProfitDistribution(models.Model):
    farmer = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.FloatField()
    date = models.DateTimeField()
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Distributed', 'Distributed')])

class Ticket(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=50, choices=[('Open', 'Open'), ('In Progress', 'In Progress'), ('Closed', 'Closed')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Feedback(models.Model):
    ticket = models.OneToOneField(Ticket, on_delete=models.CASCADE)
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()
    comments = models.TextField()

class Livestock(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    available_quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class Notification(models.Model):
    TYPES = [
        ('order', 'Order'),
        ('inventory', 'Inventory'),
        ('general', 'General'),
    ]
    customer = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    message = models.TextField()
    notification_type = models.CharField(max_length=50, choices=TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    
