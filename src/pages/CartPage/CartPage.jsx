// src/pages/CartPage/CartPage.jsx
import React from 'react';
import styles from './CartPage.module.css';

const CartPage = () => {
    return (
        <div className={styles.cartPage}>
            <h2>Shopping Cart</h2>
            <p>Your selected items will appear here.</p>
        </div>
    );
};

export default CartPage;