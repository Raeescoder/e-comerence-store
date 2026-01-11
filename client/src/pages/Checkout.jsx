import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../utils/api';
import './Checkout.css';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
        paymentMethod: 'Credit Card',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                items: cart.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity,
                })),
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    country: formData.country,
                },
                paymentMethod: formData.paymentMethod,
            };

            await api.post('/orders', orderData);
            clearCart();
            alert('Order placed successfully!');
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    const shipping = cartTotal > 50 ? 0 : 5;
    const total = cartTotal + shipping;

    return (
        <div className="checkout-page">
            <div className="container">
                <h1 className="page-title text-gradient">Checkout</h1>

                <div className="checkout-layout">
                    <form onSubmit={handleSubmit} className="checkout-form glass">
                        <h3>Shipping Information</h3>

                        <div className="form-group">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="city" className="form-label">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="postalCode" className="form-label">Postal Code</label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>

                        <h3>Payment Method</h3>

                        <div className="form-group">
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="Credit Card">Credit Card</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Cash on Delivery">Cash on Delivery</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={loading}
                        >
                            {loading ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </form>

                    <div className="order-summary glass">
                        <h3>Order Summary</h3>

                        <div className="summary-items">
                            {cart.map((item) => (
                                <div key={item._id} className="summary-item">
                                    <span>{item.product?.name} x {item.quantity}</span>
                                    <span>${(item.product?.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row summary-total">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
