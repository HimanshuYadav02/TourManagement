import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kle_user_info');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('kle_auth_token'));
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const data = await api.login(username, password);
      setToken(data.token);
      setUser(data);
      localStorage.setItem('kle_auth_token', data.token);
      localStorage.setItem('kle_user_info', JSON.stringify(data));
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('kle_auth_token');
    localStorage.removeItem('kle_user_info');
  };

  const hasRole = (role) => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  };

  const isAdmin = () => hasRole('ROLE_ADMIN');
  const isEditor = () => hasRole('ROLE_ADMIN') || hasRole('ROLE_EDITOR');
  const isConsultant = () => hasRole('ROLE_ADMIN') || hasRole('ROLE_CONSULTANT');

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, login, logout, isAdmin, isEditor, isConsultant, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
