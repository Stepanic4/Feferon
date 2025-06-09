// src/components/HeroSection/HeroSection.jsx

import React, { useEffect } from 'react'; // Убедитесь, что useEffect здесь импортирован
import styles from './HeroSection.module.css';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/hero-bg.jpg';
import ParticleButton from '../Effects/ParticleButton/ParticleButton.jsx';

// Компонент HeroSection принимает рефы как пропсы
const HeroSection = ({ heroSectionRef, heroTitleRef, heroContentRef, isScrolled }) => {

    // Логи, которые срабатывают при каждом рендере компонента HeroSection
    console.log("HeroSection: Component is rendering.");
    console.log("HeroSection: Received heroSectionRef prop:", heroSectionRef);
    console.log("HeroSection: Received heroTitleRef prop:", heroTitleRef);
    console.log("HeroSection: Received heroContentRef prop:", heroContentRef);

    // useEffect, который срабатывает после того, как компонент примонтирован в DOM
    useEffect(() => {
        console.log("HeroSection: useEffect triggered after mount.");

        // Логи, которые показывают, на что указывают current-значения рефов ВНУТРИ HeroSection
        console.log("HeroSection: Internal heroSectionRef.current:", heroSectionRef.current);
        console.log("HeroSection: Internal heroTitleRef.current:", heroTitleRef.current);
        console.log("HeroSection: Internal heroContentRef.current:", heroContentRef.current);

        // Дополнительная проверка элемента фона
        const backgroundElement = heroSectionRef.current?.querySelector(`.${styles.heroBackground}`);
        console.log("HeroSection: Internal heroBackground element (via querySelector):", backgroundElement);

        // Проверка имени CSS-класса для heroBackground из CSS-модуля
        if (styles.heroBackground) {
            console.log("HeroSection: styles.heroBackground class name from CSS module:", styles.heroBackground);
        } else {
            console.warn("HeroSection: styles.heroBackground is undefined! Check HeroSection.module.css");
        }

        // Этот useEffect запускается только один раз после монтирования
        // или при изменении зависимостей (хотя рефы не должны меняться)
    }, [heroSectionRef, heroTitleRef, heroContentRef, styles.heroBackground]); // Зависимости для useEffect

    return (
        // section - это корневой элемент HeroSection, к нему привязан heroSectionRef
        <section className={styles.heroSection} ref={heroSectionRef}>
            {/* div с фоновым изображением */}
            <div className={styles.heroBackground} style={{ backgroundImage: `url(${heroImage})` }}>
                {/* Фон, который будет "отдаляться" */}
            </div>

            {/* div, содержащий заголовок, слоган и кнопку, к нему привязан heroContentRef */}
            <div className={styles.heroContent} ref={heroContentRef}>
                {/* h1 с названием "Feferon", к нему привязан heroTitleRef */}
                <h1 className={styles.heroTitle} ref={heroTitleRef}>
                    Feferon
                </h1>
                <p className={styles.heroSlogan}>Discover Unrivaled Elegance.</p>
                <div className={styles.buttonWrapper}>
                    <ParticleButton text="Наши новинки" to="/new-arrivals" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;