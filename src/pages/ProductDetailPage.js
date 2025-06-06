import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailPage.css'; // Создадим этот файл стилей позже

function ProductDetailPage({ products, onAddToCart }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return <p>Товар не найден.</p>;
    }

    return (
        <div className="product-detail-page">
            <button onClick={() => navigate(-1)} className="back-button">
                &larr; Zpět k produktům
            </button>
            <div className="product-detail-content">
                <img src={product.image} alt={product.name} className="product-detail-image" />
                <div className="product-detail-info">
                    <h1>{product.name}</h1>
                    <p className="product-detail-description">{product.description}</p>
                    <p className="product-detail-price">{product.price.toFixed(3)} Kč</p>
                    <button className="add-to-cart-button" onClick={() => onAddToCart(product)}>
                        Přidat do košíku
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;