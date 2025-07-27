// src/components/ProtectedRoute.js
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  // Mostrar loading mientras verifica autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#332e1d] via-gray-900 to-[#2a261a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#5ac7aa]/30 border-t-[#5ac7aa] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // Solo redirigir si NO está autenticado
  if (!isAuthenticated) {
    // Guardar la página que intentaba acceder para redirigir después del login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Si está autenticado, mostrar el contenido
  return children
}

export default ProtectedRoute
