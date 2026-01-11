import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
    const handleAddToCart = (e) => {
        e.preventDefault();
        if (onAddToCart) {
            onAddToCart(product._id);
        }
    };

    return (
        <Link to={`/products/${product._id}`} className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />
                {product.stock < 10 && product.stock > 0 && (
                    <span className="badge badge-warning stock-badge">
                        Only {product.stock} left
                    </span>
                )}
                {product.stock === 0 && (
                    <span className="badge badge-error stock-badge">
                        Out of Stock
                    </span>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>

                <div className="product-rating">
                    <span className="stars">
                        {'★'.repeat(Math.round(product.rating))}
                        {'☆'.repeat(5 - Math.round(product.rating))}
                    </span>
                    <span className="rating-text">
                        {product.rating.toFixed(1)} ({product.numReviews})
                    </span>
                </div>

                <div className="product-footer">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    {onAddToCart && product.stock > 0 && (
                        <button
                            onClick={handleAddToCart}
                            className="btn btn-primary btn-sm"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
