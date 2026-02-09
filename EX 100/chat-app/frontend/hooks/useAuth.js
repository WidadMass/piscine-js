"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier si un utilisateur est déjà stocké
    const storedUser = localStorage.getItem('chat_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password, mode = 'login') => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, mode }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Erreur d\'authentification');
    }

    const { user, token } = await res.json();
    setUser(user);
    // On stocke le token ET l'utilisateur
    localStorage.setItem('chat_token', token);
    localStorage.setItem('chat_user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('chat_user');
    localStorage.removeItem('chat_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
