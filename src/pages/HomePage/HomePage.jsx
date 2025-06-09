// src/pages/HomePage/HomePage.jsx
import React from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <h1>Welcome to Feferon</h1>
            <p>Our Latest Collections and Products will be displayed here.</p>
            {/* Добавьте много такого, чтобы страница стала длинной */}
            <div style={{ height: '500px', backgroundColor: '#333', margin: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                <p>Placeholder for Product Cards Section 1</p>
            </div>
            <div style={{ height: '500px', backgroundColor: '#444', margin: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                <p>Placeholder for Product Cards Section 2</p>
            </div>
            <div style={{ height: '500px', backgroundColor: '#555', margin: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                <p>Placeholder for Product Cards Section 3</p>
            </div>
        </div>
    );
};

export default HomePage;