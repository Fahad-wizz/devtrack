import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('devtrack_token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('devtrack_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleLogout = () => {
      setToken(null);
      setUser(null);
    };
    window.addEventListener('devtrack:logout', handleLogout);
    return () => window.removeEventListener('devtrack:logout', handleLogout);
  }, []);

  const persistSession = (authResponse) => {
    localStorage.setItem('devtrack_token', authResponse.token);
    localStorage.setItem('devtrack_user', JSON.stringify(authResponse.user));
    setToken(authResponse.token);
    setUser(authResponse.user);
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', payload);
      persistSession(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', payload);
      persistSession(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('devtrack_token');
    localStorage.removeItem('devtrack_user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ token, user, loading, login, register, logout, isAuthenticated: Boolean(token) }),
    [token, user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
