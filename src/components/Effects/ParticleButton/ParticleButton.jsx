// src/components/Effects/ParticleButton/ParticleButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ParticleButton.module.css';

const ParticleButton = ({ text, to }) => {
    return (
        <Link to={to} className={styles.buttonPlaceholder}>
            {text}
        </Link>
    );
};

export default ParticleButton; // <--- УБЕДИТЕСЬ, ЧТО ЭТА СТРОКА ЕСТЬ!