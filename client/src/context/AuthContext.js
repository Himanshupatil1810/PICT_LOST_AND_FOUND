import { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuard, setIsGuard] = useState(false);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        console.log('AuthContext - initializeAuth - currentUser:', currentUser);
        
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
          // Check if user is a guard
          setIsGuard(currentUser.isGuard);
          console.log('AuthContext - initializeAuth - isGuard set to:', currentUser.isGuard);
          
          // Ensure the token is set in axios headers
          authService.setAuthHeader();
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  // Login function to be used by Login component
  const login = useCallback(async (userData) => {
    try {
      console.log('AuthContext - login - userData:', userData);
      
      // Set the user data
      setUser(userData);
      setIsAuthenticated(true);
      
      // Check if user is a guard
      setIsGuard(userData.isGuard);
      console.log('AuthContext - login - isGuard set to:', userData.isGuard);
      
      return userData;
    } catch (error) {
      console.error('Login error in context:', error);
      throw error;
    }
  }, []);

  // Update isGuard state
  const updateIsGuard = useCallback((value) => {
    console.log('AuthContext - updateIsGuard - value:', value);
    setIsGuard(value);
  }, []);

  // Logout function
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setIsGuard(false);
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        logout,
        isAuthenticated,
        isGuard,
        updateIsGuard
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
