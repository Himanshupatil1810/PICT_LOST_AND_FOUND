import axios from 'axios';

// Make sure this matches the backend route configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Register a new user (security guard)
const register = async (userData) => {
  try {
    console.log('authService - register - userData:', userData);
    
    const response = await axios.post(`${API_URL}/api/auth/register`, userData);
    console.log('authService - register - response:', response.data);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      // Set the token in axios headers
      setAuthHeader();
    }
    return response.data;
  } catch (error) {
    console.error('authService - register - error:', error);
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// Login user (security guard)
export const login = async (loginData) => {
  try {
    console.log('authService - login - loginData:', loginData);
    
    const response = await axios.post(`${API_URL}/api/auth/login`, loginData);
    console.log('authService - login - response:', response.data);
    
    const { token, user } = response.data;
    
    // Add isGuard flag to user data if it's a guard login
    const userData = {
      ...user,
      isGuard: loginData.isGuard || false
    };
    
    // Store token and user data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Set auth header for future requests
    setAuthHeader();
    
    return {
      token,
      user: userData
    };
  } catch (error) {
    console.error('authService - login - error:', error);
    throw error.response?.data?.message || 'Login failed';
  }
};

// Logout user
const logout = async () => {
  try {
    // Clear token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Remove token from axios headers
    delete axios.defaults.headers.common['Authorization'];
    
    // Call the logout endpoint if needed
    await axios.get(`${API_URL}/api/auth/logout`, {
      withCredentials: true
    });
    
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    // Still return true to allow logout even if the API call fails
    return true;
  }
};

// Get current user from local storage
const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    // First try to get the complete user data from localStorage
    const userDataString = localStorage.getItem('user');
    console.log('authService - getCurrentUser - userDataString:', userDataString);
    
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log('authService - getCurrentUser - userData:', userData);
      return userData;
    }
    
    // Fallback to parsing the JWT token if userData is not available
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    const userData = JSON.parse(jsonPayload);
    console.log('authService - getCurrentUser - userData from token:', userData);
    return userData;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Get auth token
const getToken = () => {
  return localStorage.getItem('token');
};

// Set auth token in axios headers
const setAuthHeader = () => {
  const token = getToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Initialize auth header when module loads
setAuthHeader();

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getToken,
  setAuthHeader
};