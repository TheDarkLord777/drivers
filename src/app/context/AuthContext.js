'use client'

import React, { createContext, useEffect, useState } from 'react';
import LinearIndeterminate from '@/components/progress/progres';

export const AuthContext = createContext({
  isAuthenticated: null,
  userRole: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setIsAuthenticated(!!user);
  }, []);

  const login = async (user) => {
    try {
      // Implement your login logic here
      // This could include making an API call to a server-side endpoint
      // to authenticate the user and obtain an access token and role information
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
      setUserRole(user.role);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (isAuthenticated === null) {
    return <LinearIndeterminate />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;