// src/pages/NotFoundPage/NotFoundPage.jsx
import React from 'react';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div className={styles.notFoundPage}>
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFoundPage;