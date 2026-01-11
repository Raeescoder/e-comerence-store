import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders');
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Delivered':
                return 'badge-success';
            case 'Processing':
            case 'Shipped':
                return 'badge-primary';
            case 'Cancelled':
                return 'badge-error';
            default:
                return 'badge-warning';
        }
    };

    return (
        <div className="dashboard-page">
            <div className="container">
                <h1 className="page-title text-gradient">My Dashboard</h1>

                <div className="dashboard-content">
                    <h2>Order History</h2>

                    {loading ? (
                        <div className="loading">
                            <div className="spinner"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="no-orders glass">
                            <p>You haven't placed any orders yet.</p>
                        </div>
                    ) : (
                        <div className="orders-list">
                            {orders.map((order) => (
                                <div key={order._id} className="order-card glass">
                                    <div className="order-header">
                                        <div>
                                            <h3>Order #{order._id.slice(-8)}</h3>
                                            <p className="text-muted">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className={`badge ${getStatusClass(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>

                                    <div className="order-items">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="order-item">
                                                <span>{item.name} x {item.quantity}</span>
                                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="order-footer">
                                        <div className="order-address">
                                            <strong>Shipping to:</strong>
                                            <p>
                                                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                                                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                            </p>
                                        </div>
                                        <div className="order-total">
                                            <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
