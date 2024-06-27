import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PricingCalculator() {
    const [productTypes, setProductTypes] = useState([]);
    const [decorationMethods, setDecorationMethods] = useState([]);
    const [selectedProductType, setSelectedProductType] = useState('');
    const [selectedDecorationMethod, setSelectedDecorationMethod] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [numLocations, setNumLocations] = useState(1);
    const [materialVariation, setMaterialVariation] = useState(false);
    const [priceBreakdown, setPriceBreakdown] = useState(null);

    useEffect(() => {
        axios.get('/api/producttypes/').then(response => setProductTypes(response.data));
        axios.get('/api/decorationmethods/').then(response => setDecorationMethods(response.data));
    }, []);

    const handleCalculate = () => {
        const params = {
            product_type_id: selectedProductType,
            decoration_method_id: selectedDecorationMethod,
            quantity,
            num_locations: numLocations,
            material_variation: materialVariation ? 1 : 0
        };

        axios.get('/api/pricing/calculate/', { params }).then(response => setPriceBreakdown(response.data));
    };

    return (
        <div>
            <h1>Pricing Calculator</h1>
            <div>
                <label>Product Type</label>
                <select value={selectedProductType} onChange={e => setSelectedProductType(e.target.value)}>
                    {productTypes.map(pt => (
                        <option key={pt.id} value={pt.id}>{pt.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Decoration Method</label>
                <select value={selectedDecorationMethod} onChange={e => setSelectedDecorationMethod(e.target.value)}>
                    {decorationMethods.map(dm => (
                        <option key={dm.id} value={dm.id}>{dm.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Quantity</label>
                <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
            </div>
            <div>
                <label>Number of Print Locations</label>
                <input type="number" value={numLocations} onChange={e => setNumLocations(e.target.value)} />
            </div>
            <div>
                <label>Material or Color Variation</label>
                <input type="checkbox" checked={materialVariation} onChange={e => setMaterialVariation(e.target.checked)} />
            </div>
            <button onClick={handleCalculate}>Calculate Price</button>
            {priceBreakdown && (
                <div>
                    <h2>Price Breakdown</h2>
                    <p>Base Price: {priceBreakdown.base_price}</p>
                    <p>Additional Costs: {priceBreakdown.additional_costs}</p>
                    <p>Total Price: {priceBreakdown.total_price}</p>
                </div>
            )}
        </div>
    );
}

export default PricingCalculator;
