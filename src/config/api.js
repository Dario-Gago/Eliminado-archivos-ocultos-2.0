// src/config/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  VERIFY: `${API_BASE_URL}/api/auth/verify`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  REFRESH: `${API_BASE_URL}/api/auth/refresh`,

  // File endpoints
  SCAN: `${API_BASE_URL}/api/files/scan`,
  DELETE: `${API_BASE_URL}/api/files/delete`,
  HISTORY: `${API_BASE_URL}/api/files/history`,
  STATS: `${API_BASE_URL}/api/files/stats`,
  UPLOAD: `${API_BASE_URL}/api/files/upload`,

  // User endpoints
  PROFILE: `${API_BASE_URL}/api/users/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/api/users/profile`,
  CHANGE_PASSWORD: `${API_BASE_URL}/api/users/password`,
  DELETE_ACCOUNT: `${API_BASE_URL}/api/users/account`
}

// Configuración de timeouts y reintentos
export const API_CONFIG = {
  TIMEOUT: 10000, // 10 segundos
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000 // 1 segundo
}

export default API_BASE_URL
