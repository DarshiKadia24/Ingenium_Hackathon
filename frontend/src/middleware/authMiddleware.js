import { authAPI } from '../services/api';

/**
 * Auth Middleware for token validation and session management
 */

// Token validation
export const validateToken = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return { valid: false, error: 'No token found' };
  }

  try {
    const response = await authAPI.getMe();
    return { valid: true, user: response.data.user };
  } catch (error) {
    // Token is invalid or expired
    return { valid: false, error: error.response?.data?.message || 'Token validation failed' };
  }
};

// Check if token exists and is potentially expired
export const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  
  if (!token) return true;
  
  try {
    // Decode JWT token to check expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    
    // Token is expired if current time is past expiration
    return currentTime >= expirationTime;
  } catch (error) {
    // If we can't decode the token, assume it's invalid
    return true;
  }
};

// Get time until token expiration in milliseconds
export const getTokenExpirationTime = () => {
  const token = localStorage.getItem('token');
  
  if (!token) return 0;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();
    
    return Math.max(0, expirationTime - currentTime);
  } catch (error) {
    return 0;
  }
};

// Auto-logout on token expiration
export const setupAutoLogout = (logoutCallback) => {
  const timeUntilExpiration = getTokenExpirationTime();
  
  if (timeUntilExpiration > 0) {
    // Set timeout to auto-logout when token expires
    const timeoutId = setTimeout(() => {
      console.log('Token expired, logging out...');
      logoutCallback();
    }, timeUntilExpiration);
    
    return timeoutId;
  }
  
  return null;
};

// Clear auto-logout timeout
export const clearAutoLogout = (timeoutId) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
};

// Session management - check if user should stay logged in
export const shouldRestoreSession = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  // Both token and user data must exist
  if (!token || !user) {
    return false;
  }
  
  // Token must not be expired
  if (isTokenExpired()) {
    return false;
  }
  
  return true;
};

// Clear session data
export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Initialize session on app load
export const initializeSession = async () => {
  if (!shouldRestoreSession()) {
    clearSession();
    return { authenticated: false };
  }
  
  // Validate token with backend
  const validation = await validateToken();
  
  if (!validation.valid) {
    clearSession();
    return { authenticated: false };
  }
  
  return { 
    authenticated: true, 
    user: validation.user 
  };
};

export default {
  validateToken,
  isTokenExpired,
  getTokenExpirationTime,
  setupAutoLogout,
  clearAutoLogout,
  shouldRestoreSession,
  clearSession,
  initializeSession,
};
