import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Создадим этот файл стилей позже

function ProductCard({ product, onAddToCart }) {
    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} className="product-card-image" />
                <h3 className="product-card-name">{product.name}</h3>
            </Link>
            <p className="product-card-price">{product.price.toFixed(3)} Kč</p>
            <button className="add-to-cart-button" onClick={() => onAddToCart(product)}>
                Přidat do košíku
            </button>
        </div>
    );
}

export default ProductCard;