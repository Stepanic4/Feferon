// src/App.jsx
// Импорт стилей HeroSection для доступа к именам классов
import styles from './components/HeroSection/HeroSection.module.css';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// Импорты GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Регистрация плагина GSAP (выполняется один раз в приложении)
gsap.registerPlugin(ScrollTrigger);
// Импорт контекста аутентификации
import { AuthProvider } from './contexts/AuthContext.jsx';
// Импорт пользовательского хука для позиции скролла
import { useScrollPosition } from './hooks/useScrollPosition.js';
// Импорты компонентов
import Header from './components/Header/Header.jsx';
import HeroSection from './components/HeroSection/HeroSection.jsx';
import PageTransitionEffect from './components/Effects/PageTransitionEffect/PageTransitionEffect.jsx';
// Импорты страниц
import HomePage from './pages/HomePage/HomePage.jsx';
import CartPage from './pages/CartPage/CartPage.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';

// Главный компонент App
function App() {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

// Отдельный компонент для контента приложения, чтобы использовать хуки Router
function AppContent() {
    const location = useLocation();

    const { scrollY } = useScrollPosition();
    const isScrolled = scrollY > 50;
    const [cartItemCount, setCartItemCount] = useState(0);

    const appRef = useRef(null);
    const headerRef = useRef(null);
    const heroSectionRef = useRef(null);
    const heroTitleRef = useRef(null);
    const headerFeferonLogoRef = useRef(null);
    const contactUsRef = useRef(null);
    const navIconsRef = useRef(null);
    const heroContentRef = useRef(null);

    // НОВЫЙ БЛОК useEffect для инициализации GSAP
    useEffect(() => {
        let tl; // Объявляем tl здесь, чтобы он был доступен в замыкании для очистки

        // Функция, которая будет пытаться инициализировать GSAP
        const initializeGsapAnimation = () => {
            // Проверяем, что ВСЕ необходимые рефы готовы
            if (!heroSectionRef.current || !heroTitleRef.current || !headerRef.current ||
                !headerFeferonLogoRef.current || !contactUsRef.current || !navIconsRef.current ||
                !heroContentRef.current) {
                // Если какой-либо реф ещё null, выводим предупреждение и планируем следующую попытку
                console.warn("GSAP initialization skipped: One or more refs are not ready. Retrying on next frame...");
                requestAnimationFrame(initializeGsapAnimation); // Повторяем попытку на следующем кадре
                return;
            }

            // --- ВЕСЬ КОД GSAP-АНИМАЦИИ НАЧИНАЕТСЯ ЗДЕСЬ ---

            // Получаем значения CSS-переменных для расчетов анимации
            const rootStyles = getComputedStyle(document.documentElement);

            const initialFeferonSizeVW = parseFloat(rootStyles.getPropertyValue('--hero-title-font-size-initial').replace('vw', ''));
            const initialFeferonSize = (initialFeferonSizeVW / 100) * window.innerWidth;

            const finalFeferonSizeRem = parseFloat(rootStyles.getPropertyValue('--header-logo-font-size-final').replace('rem', ''));
            const finalFeferonSize = finalFeferonSizeRem * parseFloat(getComputedStyle(document.body).fontSize);

            // Получаем координаты элементов для расчета смещений
            const heroTitleBounds = heroTitleRef.current.getBoundingClientRect();
            // const headerFeferonLogoBounds = headerFeferonLogoRef.current.getBoundingClientRect(); // <-- ИЗМЕНЕНИЕ: Эта строка больше не нужна для расчета траектории heroTitle
            // Если она не используется больше нигде, можно удалить.

            // <-- ИЗМЕНЕНИЕ: Новые targetX и targetY для движения вверх по центру
            const targetX = 0; // Остается по центру по горизонтали относительно своего начального положения
            const targetY = -(window.innerHeight * 0.5); // Уходит вверх на половину высоты окна. Можете настроить: -300px, -100vh и т.д.
            // <-- КОНЕЦ ИЗМЕНЕНИЯ


            // Создаем основную временную шкалу GSAP для анимации, привязанной к скроллу
            tl = gsap.timeline({ // Присваиваем tl здесь, чтобы его можно было убить в cleanup
                scrollTrigger: {
                    trigger: heroSectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    pin: true,
                    onUpdate: (self) => {
                        document.documentElement.style.setProperty('--animation-progress', self.progress.toFixed(4));
                    }
                }
            });

            // Анимация фонового изображения HeroSection (параллакс/зум и яркость)
            tl.to(heroSectionRef.current.querySelector(`.${styles.heroBackground}`), {
                scale: 1.0,
                filter: 'brightness(1)',
                ease: "none"
            }, 0);

            // <-- ИЗМЕНЕНИЕ: Анимация большого логотипа "Feferon"
            // Теперь он движется вверх по центру и исчезает
            tl.to(heroTitleRef.current, {
                x: targetX, // Используем новый targetX (0)
                y: targetY, // Используем новый targetY (отрицательное значение для движения вверх)
                fontSize: finalFeferonSize + "px", // Продолжает уменьшаться
                opacity: 0, // Начинает исчезать
                ease: "power2.inOut" // Более динамичное движение
            }, 0);

            // <-- ИЗМЕНЕНИЕ: Добавляем отдельный твин для ускорения исчезновения Opacity
            tl.to(heroTitleRef.current, {
                opacity: 0, // Убеждаемся, что прозрачность доходит до 0
            }, 0.7); // <-- Исчезновение завершается к 70% прокрутки
            // <-- КОНЕЦ ИЗМЕНЕНИЯ

            // <-- ИЗМЕНЕНИЕ: Анимация логотипа Feferon в шапке
            // Теперь он просто появляется на своём месте, без имитации движения большого логотипа
            tl.fromTo(headerFeferonLogoRef.current, {
                opacity: 0, // Начинает невидимым
                y: -20 // Начинает чуть выше своего конечного положения для эффекта "выплывания"
            }, {
                opacity: 1, // Становится видимым
                fontSize: finalFeferonSize + "px", // Сразу имеет конечный размер
                x: 0, // Приходит в свою окончательную позицию
                y: 0,
                ease: "power1.inOut"
            }, 0.36); // <-- Начинает на 36% прокрутки
            // <-- КОНЕЦ ИЗМЕНЕНИЯ

            // Анимация Contact Us и иконок шапки
            tl.fromTo([contactUsRef.current, navIconsRef.current], {
                opacity: 0,
                y: -20
            }, {
                opacity: 1,
                y: 0,
                ease: "power2.out",
                stagger: 0.1
            }, 0.2);

            // --- КОНЕЦ КОДА GSAP-АНИМАЦИИ ---

            // Возвращаем функцию очистки, которая будет вызвана при размонтировании компонента
            return () => {
                if (tl) { // Убедимся, что tl был создан
                    tl.kill();
                }
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        };

        // Запускаем процесс инициализации
        const cleanupGsapFunction = initializeGsapAnimation();

        // Возвращаем cleanup функцию из useEffect
        return cleanupGsapFunction;

    }, []); // Пустой массив зависимостей, чтобы useEffect запустился только один раз

    return (
        <div className="App" ref={appRef}>
            <Header
                headerRef={headerRef}
                contactUsRef={contactUsRef}
                feferonLogoRef={headerFeferonLogoRef}
                navIconsRef={navIconsRef}
                cartItemCount={cartItemCount}
                isScrolled={isScrolled}
            />

            <PageTransitionEffect>
                <Routes>
                    <Route path="/" element={
                        <>
                            <HeroSection
                                heroSectionRef={heroSectionRef}
                                heroTitleRef={heroTitleRef}
                                heroContentRef={heroContentRef}
                                isScrolled={isScrolled}
                            />
                            <HomePage />
                        </>
                    } />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </PageTransitionEffect>
        </div>
    );
}

export default App;