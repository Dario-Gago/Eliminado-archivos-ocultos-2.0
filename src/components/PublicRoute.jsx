import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()

  // Si está cargando, mostrar algún indicador de carga
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Si el usuario está autenticado, redirigir al dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  // Si no está autenticado, mostrar la página
  return children
}

export default PublicRoute
