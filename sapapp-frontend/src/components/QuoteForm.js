import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuoteForm() {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [quoteItems, setQuoteItems] = useState([]);
    const [discount, setDiscount] = useState('');
    const [customMessage, setCustomMessage] = useState('');

    useEffect(() => {
        axios.get('/api/customers/').then(response => setCustomers(response.data));
        axios.get('/api/products/').then(response => setProducts(response.data));
    }, []);

    const handleAddQuoteItem = () => {
        setQuoteItems([...quoteItems, { product: '', quantity: 1, price: '', decoration_details: '' }]);
    };

    const handleSubmit = () => {
        const newQuote = {
            customer: selectedCustomer,
            discount,
            custom_message: customMessage,
            items: quoteItems
        };
        axios.post('/api/quotes/', newQuote).then(response => {
            // Handle response
        });
    };

    return (
        <div>
            <h1>Create Quote</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Customer</label>
                    <select value={selectedCustomer} onChange={e => setSelectedCustomer(e.target.value)}>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <h2>Quote Items</h2>
                    {quoteItems.map((item, index) => (
                        <div key={index}>
                            <select value={item.product} onChange={e => {
                                const newItems = [...quoteItems];
                                newItems[index].product = e.target.value;
                                setQuoteItems(newItems);
                            }}>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                            <input type="number" value={item.quantity} onChange={e => {
                                const newItems = [...quoteItems];
                                newItems[index].quantity = e.target.value;
                                setQuoteItems(newItems);
                            }} />
                            <input type="number" value={item.price} onChange={e => {
                                const newItems = [...quoteItems];
                                newItems[index].price = e.target.value;
                                setQuoteItems(newItems);
                            }} />
                            <input type="text" value={item.decoration_details} onChange={e => {
                                const newItems = [...quoteItems];
                                newItems[index].decoration_details = e.target.value;
                                setQuoteItems(newItems);
                            }} />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddQuoteItem}>Add Item</button>
                </div>
                <div>
                    <label>Discount</label>
                    <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} />
                </div>
                <div>
                    <label>Custom Message</label>
                    <textarea value={customMessage} onChange={e => setCustomMessage(e.target.value)} />
                </div>
                <button type="submit">Create Quote</button>
            </form>
        </div>
    );
}

export default QuoteForm;
