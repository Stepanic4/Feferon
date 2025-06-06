import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css'; // Создадим этот файл стилей позже

function ProductList({ products, onAddToCart }) {
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
}

export default ProductList;