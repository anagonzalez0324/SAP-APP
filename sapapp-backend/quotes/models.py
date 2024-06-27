from django.db import models
from customers.models import Customer
from products.models import Product

class Quote(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    products = models.ManyToManyField(Product, through='QuoteItem')
    estimated_total = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    custom_message = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending')
    approval_link = models.CharField(max_length=255, blank=True, null=True)

class QuoteItem(models.Model):
    quote = models.ForeignKey(Quote, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    decoration_details = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
