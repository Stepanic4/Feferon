import React from 'react';
import './Cart.css'; // Создадим этот файл стилей позже

function Cart({ cartItems, onRemoveFromCart, onUpdateQuantity }) {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2>Váš košík</h2>
            {cartItems.length === 0 ? (
                <p>Váš košík je prázdný.</p>
            ) : (
                <>
                    <ul className="cart-items-list">
                        {cartItems.map((item) => (
                            <li key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>{item.price.toFixed(3)} Kč</p>
                                    <div className="cart-item-quantity">
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button className="remove-item-button" onClick={() => onRemoveFromCart(item.id)}>
                                        Vymazat
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h3>Celkový: {total.toFixed(3)} Kč</h3>
                        <button className="checkout-button">Odeslat objednávku</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;