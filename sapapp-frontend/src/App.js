import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PricingCalculator from './components/PricingCalculator';
import QuoteForm from './components/QuoteForm';
import QuoteApproval from './components/QuoteApproval';
import InvoiceForm from './components/InvoiceForm';
import OrderForm from './components/OrderForm';
import AppNavbar from './components/Navbar';
import './App.css';

function Home() {
    return (
        <div>
            <h1>Welcome to the Screen Print Shop Management App</h1>
            <p>Please use the navigation to access different features.</p>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                <AppNavbar />
                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/pricing-calculator" element={<PricingCalculator />} />
                        <Route path="/create-quote" element={<QuoteForm />} />
                        <Route path="/quotes/approve/:approvalLink" element={<QuoteApproval />} />
                        <Route path="/invoice-form" element={<InvoiceForm />} />
                        <Route path="/order-form" element={<OrderForm />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
