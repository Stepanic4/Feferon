// src/components/Effects/PageTransitionEffect/PageTransitionEffect.jsx
import React from 'react';
import styles from './PageTransitionEffect.module.css'; // Можно оставить пустым или удалить, если не нужен

const PageTransitionEffect = ({ children }) => {
    // В будущем здесь будет сложная логика переходов с GSAP и Three.js
    // Пока просто рендерит дочерние элементы
    return (
        <div className={styles.pageTransitionWrapper}>
            {children}
        </div>
    );
};

export default PageTransitionEffect;