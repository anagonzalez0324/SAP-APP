from rest_framework import viewsets
from .models import Quote, QuoteItem
from .serializers import QuoteSerializer, QuoteItemSerializer
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.crypto import get_random_string

class QuoteViewSet(viewsets.ModelViewSet):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer

    def perform_create(self, serializer):
        quote = serializer.save()
        approval_link = get_random_string(32)
        quote.approval_link = approval_link
        quote.save()

        # Send email to customer
        customer_email = quote.customer.email
        approval_url = f"http://yourdomain.com/quotes/approve/{approval_link}/"
        send_mail(
            'New Quote Available',
            f'Please review and approve your quote: {approval_url}',
            'from@example.com',
            [customer_email],
            fail_silently=False,
        )

    @action(detail=True, methods=['get'])
    def approve(self, request, pk=None):
        quote = self.get_object()
        if quote.status == 'pending':
            quote.status = 'approved'
            quote.save()

            # Convert to order
            order = Order.objects.create(
                customer=quote.customer,
                due_date=timezone.now() + timedelta(days=7),  # Example due date
                special_instructions=quote.custom_message,
                status='pending'
            )
            for item in quote.quoteitem_set.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    decoration_details=item.decoration_details
                )

            return Response({'status': 'Quote approved and converted to order'})

    @action(detail=True, methods=['get'])
    def reject(self, request, pk=None):
        quote = self.get_object()
        if quote.status == 'pending':
            quote.status = 'rejected'
            quote.save()
            return Response({'status': 'Quote rejected'})

class QuoteItemViewSet(viewsets.ModelViewSet):
    queryset = QuoteItem.objects.all()
    serializer_class = QuoteItemSerializer
