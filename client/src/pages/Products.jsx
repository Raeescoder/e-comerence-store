import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        search: '',
        sort: '',
    });
    const { addToCart } = useCart();

    const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys', 'Other'];

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (filters.category) params.append('category', filters.category);
            if (filters.search) params.append('search', filters.search);
            if (filters.sort) params.append('sort', filters.sort);

            const { data } = await api.get(`/products?${params}`);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddToCart = async (productId) => {
        const result = await addToCart(productId, 1);
        if (result.success) {
            alert('Product added to cart!');
        } else {
            alert(result.message || 'Please login to add items to cart');
        }
    };

    return (
        <div className="products-page">
            <div className="container">
                <h1 className="page-title text-gradient">Our Products</h1>

                {/* Filters */}
                <div className="filters glass">
                    <div className="filter-group">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search products..."
                            value={filters.search}
                            onChange={handleFilterChange}
                            className="form-input"
                        />
                    </div>

                    <div className="filter-group">
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            className="form-select"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <select
                            name="sort"
                            value={filters.sort}
                            onChange={handleFilterChange}
                            className="form-select"
                        >
                            <option value="">Sort By</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="no-products">
                        <p>No products found</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
