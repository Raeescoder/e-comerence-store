import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Electronics',
        image: '',
        stock: '',
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        if (activeTab === 'products') {
            fetchProducts();
        } else {
            fetchOrders();
        }
    }, [activeTab]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/products');
            setProducts(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/orders/all');
            setOrders(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/products/${editingId}`, formData);
                alert('Product updated successfully');
            } else {
                await api.post('/products', formData);
                alert('Product created successfully');
            }
            resetForm();
            fetchProducts();
        } catch (error) {
            alert(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            image: product.image,
            stock: product.stock,
        });
        setEditingId(product._id);
        setShowProductForm(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                alert('Product deleted');
                fetchProducts();
            } catch (error) {
                alert('Failed to delete product');
            }
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status: newStatus });
            alert('Order status updated');
            fetchOrders();
        } catch (error) {
            alert('Failed to update order');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: 'Electronics',
            image: '',
            stock: '',
        });
        setEditingId(null);
        setShowProductForm(false);
    };

    return (
        <div className="admin-dashboard">
            <div className="container">
                <h1 className="page-title text-gradient">Admin Dashboard</h1>

                <div className="admin-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        Products
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Orders
                    </button>
                </div>

                {activeTab === 'products' && (
                    <div className="admin-section">
                        <div className="section-header">
                            <h2>Manage Products</h2>
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowProductForm(!showProductForm)}
                            >
                                {showProductForm ? 'Cancel' : '+ Add Product'}
                            </button>
                        </div>

                        {showProductForm && (
                            <form onSubmit={handleSubmit} className="product-form glass">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Category</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="form-select"
                                        >
                                            <option>Electronics</option>
                                            <option>Clothing</option>
                                            <option>Home & Garden</option>
                                            <option>Sports</option>
                                            <option>Books</option>
                                            <option>Toys</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="form-textarea"
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Price</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="form-input"
                                            step="0.01"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Stock</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Image URL</label>
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    {editingId ? 'Update Product' : 'Create Product'}
                                </button>
                            </form>
                        )}

                        {loading ? (
                            <div className="loading">
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            <div className="products-table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product._id}>
                                                <td>{product.name}</td>
                                                <td>{product.category}</td>
                                                <td>${product.price.toFixed(2)}</td>
                                                <td>{product.stock}</td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button
                                                            className="btn btn-secondary btn-sm"
                                                            onClick={() => handleEdit(product)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-outline btn-sm"
                                                            onClick={() => handleDelete(product._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="admin-section">
                        <h2>Manage Orders</h2>

                        {loading ? (
                            <div className="loading">
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            <div className="orders-table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id}>
                                                <td>#{order._id.slice(-8)}</td>
                                                <td>{order.user?.name}</td>
                                                <td>${order.totalPrice.toFixed(2)}</td>
                                                <td>
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                                        className="status-select"
                                                    >
                                                        <option>Pending</option>
                                                        <option>Processing</option>
                                                        <option>Shipped</option>
                                                        <option>Delivered</option>
                                                        <option>Cancelled</option>
                                                    </select>
                                                </td>
                                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <button className="btn btn-secondary btn-sm">
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
