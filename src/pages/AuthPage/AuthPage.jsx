// src/pages/AuthPage/AuthPage.jsx
import React from 'react';
import styles from './AuthPage.module.css'; // Импортируем стили, если они будут

const AuthPage = () => {
    return (
        <div className={styles.authPage}>
            <h2>Auth Page (Login/Register)</h2>
            <p>This is where authentication forms will go.</p>
        </div>
    );
};

export default AuthPage; // <--- ЭТО ВАЖНО! Экспортируем компонент по умолчанию