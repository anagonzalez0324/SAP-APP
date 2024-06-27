from django.db import models
from customers.models import Customer
from orders.models import Order

class Invoice(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.DecimalField(max_digits=5, decimal_places=2)
    logo = models.ImageField(upload_to='invoices/logos/', blank=True, null=True)
    custom_message = models.TextField(blank=True, null=True)