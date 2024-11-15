'use client';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext({
  isAuthenticated: null,
  userRole: null,
  userType: 'user',
  user: null,
  setUserType: () => {},
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userType, setUserType] = useState('user');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const savedUserType = localStorage.getItem('userType');
        const token = localStorage.getItem('token');
        
        if (user && token) {
          setUser(user);
          setIsAuthenticated(true);
          setUserRole(user.role);
          if (savedUserType) {
            setUserType(savedUserType);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const updateUserType = (type) => {
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  const login = async (userData) => {
    try {
      setIsLoading(true);
      // Add API call here
      // const response = await loginAPI(userData);
      // const { user, token } = response.data;

      // For now using mock data
      const { token, ...userWithoutToken } = userData;
      
      localStorage.setItem('user', JSON.stringify(userWithoutToken));
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userData.userType);
      
      setUser(userWithoutToken);
      setIsAuthenticated(true);
      setUserRole(userData.role);
      setUserType(userData.userType);

      return true;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      // Add API call here if needed
      // await logoutAPI();
      
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      // Don't remove userType to persist preference
      
      setUser(null);
      setIsAuthenticated(false);
      setUserRole(null);
      
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userRole,
      userType,
      user,
      setUserType: updateUserType,
      login,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};