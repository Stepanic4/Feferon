import React from 'react';
import Cart from '../components/Cart';

function CartPage({ cartItems, onRemoveFromCart, onUpdateQuantity }) {
    return (
        <div className="cart-page">
            <Cart
                cartItems={cartItems}
                onRemoveFromCart={onRemoveFromCart}
                onUpdateQuantity={onUpdateQuantity}
            />
        </div>
    );
}

export default CartPage;