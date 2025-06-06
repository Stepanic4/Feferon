import React from 'react';
import ProductList from '../components/ProductList';

function HomePage({ products, onAddToCart }) {
    return (
        <div className="home-page">
            <h2>Naše produkty</h2>
            <ProductList products={products} onAddToCart={onAddToCart} />
        </div>
    );
}

export default HomePage;