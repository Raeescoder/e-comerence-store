import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data } = await api.get(`/products/${id}`);
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        const result = await addToCart(product._id, quantity);
        if (result.success) {
            alert('Product added to cart!');
            navigate('/cart');
        } else {
            alert(result.message || 'Please login to add items to cart');
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>Product not found</h2>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            <div className="container">
                <div className="product-detail glass">
                    <div className="product-image-section">
                        <img src={product.image} alt={product.name} className="detail-image" />
                    </div>

                    <div className="product-info-section">
                        <span className="product-category-badge badge badge-primary">
                            {product.category}
                        </span>

                        <h1 className="product-title">{product.name}</h1>

                        <div className="product-rating-detail">
                            <span className="stars">
                                {'★'.repeat(Math.round(product.rating))}
                                {'☆'.repeat(5 - Math.round(product.rating))}
                            </span>
                            <span className="rating-text">
                                {product.rating.toFixed(1)} ({product.numReviews} reviews)
                            </span>
                        </div>

                        <p className="product-description">{product.description}</p>

                        <div className="product-price-section">
                            <span className="detail-price">${product.price.toFixed(2)}</span>
                        </div>

                        <div className="product-stock">
                            {product.stock > 0 ? (
                                <span className="badge badge-success">In Stock ({product.stock} available)</span>
                            ) : (
                                <span className="badge badge-error">Out of Stock</span>
                            )}
                        </div>

                        {product.stock > 0 && (
                            <>
                                <div className="quantity-selector">
                                    <label htmlFor="quantity">Quantity:</label>
                                    <div className="quantity-controls">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            id="quantity"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            min="1"
                                            max={product.stock}
                                            className="quantity-input"
                                        />
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button onClick={handleAddToCart} className="btn btn-primary btn-lg btn-block">
                                    Add to Cart
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
