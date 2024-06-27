import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AppNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">Screen Print Shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/pricing-calculator">Pricing Calculator</Nav.Link>
                    <Nav.Link as={Link} to="/create-quote">Create Quote</Nav.Link>
                    <Nav.Link as={Link} to="/invoice-form">Invoice Form</Nav.Link>
                    <Nav.Link as={Link} to="/order-form">Order Form</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AppNavbar;
