// src/hooks/useScrollPosition.js
import { useState, useEffect } from 'react';

export const useScrollPosition = () => {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Очистка слушателя событий при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Пустой массив зависимостей означает, что эффект запустится один раз при монтировании

    return { scrollY };
};