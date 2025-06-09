// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Создаем контекст аутентификации
const AuthContext = createContext(null);

// Пользовательский хук для использования контекста
export const useAuth = () => {
    return useContext(AuthContext);
};

// Провайдер контекста
export const AuthProvider = ({ children }) => {
    // Здесь будет ваша логика аутентификации (useState для пользователя, функции входа/выхода)
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Временно для примера
    const [user, setUser] = useState(null); // Временно

    const login = (username, password) => {
        // Здесь реальная логика входа
        console.log('Attempting to log in:', username, password);
        setIsAuthenticated(true);
        setUser({ name: username });
    };

    const logout = () => {
        // Здесь реальная логика выхода
        console.log('Logging out');
        setIsAuthenticated(false);
        setUser(null);
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};