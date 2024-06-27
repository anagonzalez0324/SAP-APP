from django.urls import path
from .views import QuoteViewSet

quote_list = QuoteViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

quote_detail = QuoteViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

quote_approve = QuoteViewSet.as_view({
    'get': 'approve'
})

quote_reject = QuoteViewSet.as_view({
    'get': 'reject'
})

urlpatterns = [
    path('quotes/', quote_list, name='quote-list'),
    path('quotes/<int:pk>/', quote_detail, name='quote-detail'),
    path('quotes/approve/<str:approval_link>/', quote_approve, name='quote-approve'),
    path('quotes/reject/<str:approval_link>/', quote_reject, name='quote-reject'),
]
