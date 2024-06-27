import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InvoiceForm({ orderId }) {
    const [order, setOrder] = useState(null);
    const [logo, setLogo] = useState(null);
    const [customMessage, setCustomMessage] = useState('');

    useEffect(() => {
        axios.get(`/api/orders/${orderId}/`).then(response => setOrder(response.data));
    }, [orderId]);

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('order', orderId);
        formData.append('logo', logo);
        formData.append('custom_message', customMessage);
        axios.post('/api/invoices/', formData).then(response => {
            // Handle response
        });
    };

    return (
        <div>
            <h1>Create Invoice</h1>
            {order && (
                <div>
                    <p>Customer: {order.customer.name}</p>
                    <p>Total Amount: {order.total_amount}</p>
                </div>
            )}
            <div>
                <label>Logo</label>
                <input type="file" onChange={e => setLogo(e.target.files[0])} />
            </div>
            <div>
                <label>Custom Message</label>
                <textarea value={customMessage} onChange={e => setCustomMessage(e.target.value)} />
            </div>
            <button onClick={handleSubmit}>Generate Invoice</button>
        </div>
    );
}

export default InvoiceForm;
