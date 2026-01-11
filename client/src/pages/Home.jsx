import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            const { data } = await api.get('/products?sort=rating');
            setProducts(data.slice(0, 6));
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (productId) => {
        const result = await addToCart(productId, 1);
        if (result.success) {
            alert('Product added to cart!');
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content fade-in">
                        <h1 className="hero-title">
                            Welcome to <span className="text-gradient">ShopHub</span>
                        </h1>
                        <p className="hero-subtitle">
                            Discover amazing products at unbeatable prices. Your premium shopping experience starts here.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/products" className="btn btn-primary btn-lg">
                                Shop Now
                            </Link>
                            <Link to="/products" className="btn btn-outline btn-lg">
                                Browse Categories
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-card glass">
                            <div className="feature-icon">🚚</div>
                            <h3>Free Shipping</h3>
                            <p>On orders over $50</p>
                        </div>
                        <div className="feature-card glass">
                            <div className="feature-icon">🔒</div>
                            <h3>Secure Payment</h3>
                            <p>100% secure transactions</p>
                        </div>
                        <div className="feature-card glass">
                            <div className="feature-icon">↩️</div>
                            <h3>Easy Returns</h3>
                            <p>30-day return policy</p>
                        </div>
                        <div className="feature-card glass">
                            <div className="feature-icon">⭐</div>
                            <h3>Premium Quality</h3>
                            <p>Top-rated products</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-products">
                <div className="container">
                    <h2 className="section-title text-center">Featured Products</h2>
                    <p className="section-subtitle text-center text-muted">
                        Check out our best-selling items
                    </p>

                    {loading ? (
                        <div className="loading">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <>
                            <div className="products-grid">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                            </div>
                            <div className="text-center" style={{ marginTop: '2rem' }}>
                                <Link to="/products" className="btn btn-primary">
                                    View All Products
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
