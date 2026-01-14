/**
 * API Configuration
 * Centralized API URL for all HTTP requests
 */

// Use environment variable or default to local backend
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Helper to build API endpoints
export const apiUrl = (path) => `${API_BASE_URL}${path}`;

export default API_BASE_URL;
