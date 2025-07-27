// src/config/api.js - Crear este archivo si no existe
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'

export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  VERIFY: `${API_BASE_URL}/api/auth/verify`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,

  // File endpoints
  SCAN: `${API_BASE_URL}/api/files/scan`,
  DELETE: `${API_BASE_URL}/api/files/delete`,
  HISTORY: `${API_BASE_URL}/api/files/history`,
  STATS: `${API_BASE_URL}/api/files/stats`,

  // User endpoints
  PROFILE: `${API_BASE_URL}/api/users/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/api/users/profile`,
  CHANGE_PASSWORD: `${API_BASE_URL}/api/users/password`
}

export default API_BASE_URL
