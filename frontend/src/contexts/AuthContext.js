import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { handleGenericError } from '../utils/errorHandler';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Set up axios defaults
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get('/api/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        // Clear invalid token
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // Clear invalid token on any error
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError('');
      setLoading(true);
      
      console.log('Attempting login with:', { email, password });
      
      const response = await axios.post('/api/auth/login', { email, password });
      console.log('Login response:', response.data);
      
      if (response.data.success) {
        const { token, user } = response.data;
        
        // Store token and set axios header
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Update user state
        setUser(user);
        setError('');
        
        console.log('Login successful, user set:', user);
        
        return { success: true };
      } else {
        const errorMessage = response.data.message || 'Login failed';
        setError(errorMessage);
        console.error('Login failed:', errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorResult = handleGenericError(error);
      const errorMessage = typeof errorResult === 'string' ? errorResult : errorResult.message;
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setError('');
      setLoading(true);
      
      console.log('Attempting registration with:', { name, email });
      
      const response = await axios.post('/api/auth/register', { name, email, password });
      console.log('Registration response:', response.data);
      
      if (response.data.success) {
        const { token, user } = response.data;
        
        // Store token and set axios header
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Update user state
        setUser(user);
        setError('');
        
        console.log('Registration successful, user set:', user);
        
        return { success: true };
      } else {
        const errorMessage = response.data.message || 'Registration failed';
        setError(errorMessage);
        console.error('Registration failed:', errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorResult = handleGenericError(error);
      const errorMessage = typeof errorResult === 'string' ? errorResult : errorResult.message;
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out user');
    // Clear token and user state
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setError('');
  };

  const updateProfile = async (name, bio) => {
    try {
      setError('');
      const response = await axios.put('/api/users/profile', { name, bio });
      
      if (response.data.success) {
        setUser(response.data.user);
        return { success: true };
      } else {
        const errorMessage = response.data.message || 'Profile update failed';
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      const errorResult = handleGenericError(error);
      const errorMessage = typeof errorResult === 'string' ? errorResult : errorResult.message;
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const clearError = () => {
    setError('');
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    clearError,
    refreshUser: checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 