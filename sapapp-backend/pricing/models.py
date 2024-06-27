from django.db import models

class ProductType(models.Model):
    name = models.CharField(max_length=100)
    base_price = models.DecimalField(max_digits=10, decimal_places=2)

class DecorationMethod(models.Model):
    name = models.CharField(max_length=100)
    base_price = models.DecimalField(max_digits=10, decimal_places=2)

class PricingRule(models.Model):
    product_type = models.ForeignKey(ProductType, on_delete=models.CASCADE)
    decoration_method = models.ForeignKey(DecorationMethod, on_delete=models.CASCADE)
    quantity_threshold = models.PositiveIntegerField()
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    additional_cost_per_location = models.DecimalField(max_digits=10, decimal_places=2)
    material_or_color_variation_cost = models.DecimalField(max_digits=10, decimal_places=2)
