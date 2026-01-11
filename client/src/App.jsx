import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="app">
                        <Navbar />
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/products/:id" element={<ProductDetail />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />

                                <Route
                                    path="/cart"
                                    element={
                                        <PrivateRoute>
                                            <Cart />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path="/checkout"
                                    element={
                                        <PrivateRoute>
                                            <Checkout />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path="/dashboard"
                                    element={
                                        <PrivateRoute>
                                            <Dashboard />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path="/admin"
                                    element={
                                        <PrivateRoute adminOnly>
                                            <AdminDashboard />
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
