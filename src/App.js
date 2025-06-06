import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import productsData from './data/products';
import './App.css'; // Основные стили

function App() {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleAddToCart = (productToAdd) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === productToAdd.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...productToAdd, quantity: 1 }];
            }
        });
    };

    const handleRemoveFromCart = (idToRemove) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== idToRemove));
    };

    const handleUpdateQuantity = (idToUpdate, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === idToUpdate
                    ? { ...item, quantity: Math.max(1, newQuantity) } // Количество не может быть меньше 1
                    : item
            )
        );
    };

    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <Router>
            <div className="app">
                <Header cartItemCount={cartItemCount} />
                <main className="main-content">
                    <Routes>
                        <Route
                            path="/"
                            element={<HomePage products={productsData} onAddToCart={handleAddToCart} />}
                        />
                        <Route
                            path="/products/:id"
                            element={<ProductDetailPage products={productsData} onAddToCart={handleAddToCart} />}
                        />
                        <Route
                            path="/cart"
                            element={
                                <CartPage
                                    cartItems={cartItems}
                                    onRemoveFromCart={handleRemoveFromCart}
                                    onUpdateQuantity={handleUpdateQuantity}
                                />
                            }
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;