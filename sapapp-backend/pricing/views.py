from rest_framework import viewsets
from .models import ProductType, DecorationMethod, PricingRule
from .serializers import ProductTypeSerializer, DecorationMethodSerializer, PricingRuleSerializer

class ProductTypeViewSet(viewsets.ModelViewSet):
    queryset = ProductType.objects.all()
    serializer_class = ProductTypeSerializer

class DecorationMethodViewSet(viewsets.ModelViewSet):
    queryset = DecorationMethod.objects.all()
    serializer_class = DecorationMethodSerializer

class PricingRuleViewSet(viewsets.ModelViewSet):
    queryset = PricingRule.objects.all()
    serializer_class = PricingRuleSerializer

# Function to calculate price
def calculate_price(product_type_id, decoration_method_id, quantity, num_locations, material_variation):
    product_type = ProductType.objects.get(id=product_type_id)
    decoration_method = DecorationMethod.objects.get(id=decoration_method_id)
    pricing_rule = PricingRule.objects.filter(product_type=product_type, decoration_method=decoration_method, quantity_threshold__lte=quantity).order_by('-quantity_threshold').first()
    
    base_price = product_type.base_price + decoration_method.base_price
    additional_costs = (num_locations * pricing_rule.additional_cost_per_location) + (material_variation * pricing_rule.material_or_color_variation_cost)
    total_price = (base_price + additional_costs) * quantity
    
    return {
        'base_price': base_price,
        'additional_costs': additional_costs,
        'total_price': total_price
    }
