// src/components/Header/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

// Импортируем иконки (пока будут заглушками, потом можно заменить на SVG)
// Убедитесь, что эти пути правильные, если вы уже добавили иконки
import CartIcon from '../../assets/icons/cart-icon.svg'; // Предполагаем, что у вас будет такая иконка
import UserIcon from '../../assets/icons/user-icon.svg'; // Предполагаем, что у вас будет такая иконка

const Header = ({ headerRef, contactUsRef, feferonLogoRef, navIconsRef, cartItemCount, isScrolled }) => {

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`} ref={headerRef}>
            <div className={styles.leftSection}>
                <Link to="/contact" ref={contactUsRef} className={styles.contactUsLink}>
                    Contact Us
                </Link>
            </div>
            <div className={styles.centerSection}>
                <Link to="/" ref={feferonLogoRef} className={styles.feferonLogo}>
                    Feferon
                </Link>
            </div>
            <div className={styles.rightSection} ref={navIconsRef}>
                {/* ... иконки ... */}
            </div>
        </header>
    );
};

export default Header;