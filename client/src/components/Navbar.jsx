import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, isAdmin, user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="logo">
                        <span className="logo-icon">🛍️</span>
                        <span className="logo-text">ShopHub</span>
                    </Link>

                    <div className="nav-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/products" className="nav-link">Products</Link>

                        {isAuthenticated ? (
                            <>
                                <Link to="/cart" className="nav-link cart-link">
                                    Cart
                                    {cartCount > 0 && (
                                        <span className="cart-badge">{cartCount}</span>
                                    )}
                                </Link>
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                {isAdmin && (
                                    <Link to="/admin" className="nav-link admin-link">Admin</Link>
                                )}
                                <div className="user-menu">
                                    <span className="user-name">{user?.name}</span>
                                    <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
                                <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
