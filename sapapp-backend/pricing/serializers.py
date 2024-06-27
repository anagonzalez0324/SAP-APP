from rest_framework import serializers
from .models import ProductType, DecorationMethod, PricingRule

class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = '__all__'

class DecorationMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = DecorationMethod
        fields = '__all__'

class PricingRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingRule
        fields = '__all__'
