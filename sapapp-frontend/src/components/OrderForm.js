import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderForm() {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [orderItems, setOrderItems] = useState([]);
    const [dueDate, setDueDate] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');

    useEffect(() => {
        // Fetch customers and products
        axios.get('/api/customers/').then(response => setCustomers(response.data));
        axios.get('/api/products/').then(response => setProducts(response.data));
    }, []);

    const handleAddOrderItem = () => {
        setOrderItems([...orderItems, { product: '', quantity: 1, decoration_details: '' }]);
    };

    const handleSubmit = () => {
        const newOrder = {
            customer: selectedCustomer,
            due_date: dueDate,
            special_instructions: specialInstructions,
            items: orderItems
        };
        axios.post('/api/orders/', newOrder).then(response => {
            // Handle response
        });
    };

    return (
        <div>
            <h1>Create Order</h1>
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
                    <label>Due Date</label>
                    <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                </div>
                <div>
                    <label>Special Instructions</label>
                    <textarea value={specialInstructions} onChange={e => setSpecialInstructions(e.target.value)} />
                </div>
                <div>
                    <h2>Order Items</h2>
                    {orderItems.map((item, index) => (
                        <div key={index}>
                            <select value={item.product} onChange={e => {
                                const newItems = [...orderItems];
                                newItems[index].product = e.target.value;
                                setOrderItems(newItems);
                            }}>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                            <input type="number" value={item.quantity} onChange={e => {
                                const newItems = [...orderItems];
                                newItems[index].quantity = e.target.value;
                                setOrderItems(newItems);
                            }} />
                            <input type="text" value={item.decoration_details} onChange={e => {
                                const newItems = [...orderItems];
                                newItems[index].decoration_details = e.target.value;
                                setOrderItems(newItems);
                            }} />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddOrderItem}>Add Item</button>
                </div>
                <button type="submit">Create Order</button>
            </form>
        </div>
    );
}

export default OrderForm;
