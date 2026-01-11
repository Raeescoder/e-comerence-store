import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        await updateQuantity(itemId, newQuantity);
    };

    const handleRemove = async (itemId) => {
        if (confirm('Remove this item from cart?')) {
            await removeFromCart(itemId);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <div className="container">
                    <div className="empty-cart-content glass">
                        <div className="empty-icon">🛒</div>
                        <h2>Your cart is empty</h2>
                        <p>Add some products to get started!</p>
                        <button onClick={() => navigate('/products')} className="btn btn-primary">
                            Browse Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <h1 className="page-title text-gradient">Shopping Cart</h1>

                <div className="cart-layout">
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item._id} className="cart-item glass">
                                <img
                                    src={item.product?.image}
                                    alt={item.product?.name}
                                    className="cart-item-image"
                                />

                                <div className="cart-item-info">
                                    <h3>{item.product?.name}</h3>
                                    <p className="text-muted">{item.product?.category}</p>
                                    <p className="cart-item-price">
                                        ${item.product?.price.toFixed(2)}
                                    </p>
                                </div>

                                <div className="cart-item-controls">
                                    <div className="quantity-controls">
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span className="quantity-display">{item.quantity}</span>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                            disabled={item.quantity >= item.product?.stock}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        className="btn btn-outline btn-sm"
                                        onClick={() => handleRemove(item._id)}
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    ${(item.product?.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary glass">
                        <h3>Order Summary</h3>

                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>{cartTotal > 50 ? 'FREE' : '$5.00'}</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row summary-total">
                            <span>Total:</span>
                            <span>${(cartTotal + (cartTotal > 50 ? 0 : 5)).toFixed(2)}</span>
                        </div>

                        <button onClick={handleCheckout} className="btn btn-primary btn-block">
                            Proceed to Checkout
                        </button>

                        <button
                            onClick={() => navigate('/products')}
                            className="btn btn-secondary btn-block"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
