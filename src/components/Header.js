import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Создадим этот файл стилей позже

function Header({ cartItemCount }) {
    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">
                    Feferon
                </Link>
                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/">Zboží</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cart">
                                Košík ({cartItemCount})
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;