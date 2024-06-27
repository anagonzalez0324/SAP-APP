import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function QuoteApproval() {
    const { approvalLink } = useParams();
    const history = useNavigate();
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        axios.get(`/api/quotes/approve/${approvalLink}/`).then(response => {
            setQuote(response.data);
        });
    }, [approvalLink]);

    const handleApproval = (action) => {
        axios.get(`/api/quotes/${action}/${approvalLink}/`).then(response => {
            alert(response.data.status);
            history.push('/');
        });
    };

    return (
        <div>
            {quote && (
                <div>
                    <h1>Quote Details</h1>
                    <p>Customer: {quote.customer.name}</p>
                    <p>Total: {quote.estimated_total}</p>
                    <p>Message: {quote.custom_message}</p>
                    <button onClick={() => handleApproval('approve')}>Approve</button>
                    <button onClick={() => handleApproval('reject')}>Reject</button>
                </div>
            )}
        </div>
    );
}

export default QuoteApproval;
