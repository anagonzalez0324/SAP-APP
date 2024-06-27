from rest_framework import viewsets
from .models import Invoice
from .serializers import InvoiceSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    def perform_create(self, serializer):
        order = serializer.validated_data['order']
        # Calculate total amount, tax, etc.
        total_amount = order.items.aggregate(total=models.Sum('price'))['total']
        tax = total_amount * 0.1  # Example tax calculation
        serializer.save(total_amount=total_amount, tax=tax)
