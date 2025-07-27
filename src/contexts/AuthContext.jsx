// src/contexts/AuthContext.js - CONEXIÓN REAL AL BACKEND
import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // URL REAL del backend - NO SIMULACIÓN
  const API_BASE_URL = 'http://localhost:3001'

  // Verificar autenticación al cargar
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      console.log('Token encontrado, verificando con backend...')

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          console.log('✅ Token válido, usuario autenticado:', data.user)
          setToken(storedToken)
          setUser(data.user)
          setIsAuthenticated(true)
        } else {
          console.log('❌ Token inválido, limpiando localStorage')
          logout()
        }
      } catch (error) {
        console.error('❌ Error verificando token:', error)
        logout()
      }
    } else {
      console.log('ℹ️ No hay token guardado')
    }
    setIsLoading(false)
  }

  const register = async (name, email, password) => {
    console.log('🚀 INICIANDO REGISTRO REAL CON BACKEND')
    console.log('📝 Datos:', { name, email, password: '***' })
    console.log('🌐 URL:', `${API_BASE_URL}/api/auth/register`)

    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })

      console.log('📡 Respuesta del servidor:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      })

      // Intentar leer la respuesta
      let data
      const contentType = response.headers.get('content-type')

      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
        console.log('📦 Datos recibidos:', data)
      } else {
        const textData = await response.text()
        console.log('📄 Respuesta como texto:', textData)
        throw new Error(`Respuesta no es JSON: ${textData}`)
      }

      if (response.ok && data.token && data.user) {
        console.log('✅ REGISTRO EXITOSO')
        setUser(data.user)
        setToken(data.token)
        setIsAuthenticated(true)
        localStorage.setItem('token', data.token)
        return { success: true, user: data.user, message: data.message }
      } else {
        console.log('❌ REGISTRO FALLÓ:', data)
        return {
          success: false,
          error: data.error || `Error del servidor: ${response.status}`
        }
      }
    } catch (error) {
      console.error('💥 ERROR DE CONEXIÓN EN REGISTRO:', error)

      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return {
          success: false,
          error:
            'No se puede conectar al servidor. ¿Está corriendo en http://localhost:3001?'
        }
      }

      return {
        success: false,
        error: `Error de conexión: ${error.message}`
      }
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email, password) => {
    console.log('🚀 INICIANDO LOGIN REAL CON BACKEND')
    console.log('📝 Email:', email)
    console.log('🌐 URL:', `${API_BASE_URL}/api/auth/login`)

    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      console.log('📡 Respuesta del servidor:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      })

      // Intentar leer la respuesta
      let data
      const contentType = response.headers.get('content-type')

      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
        console.log('📦 Datos recibidos:', data)
      } else {
        const textData = await response.text()
        console.log('📄 Respuesta como texto:', textData)
        throw new Error(`Respuesta no es JSON: ${textData}`)
      }

      if (response.ok && data.token && data.user) {
        console.log('✅ LOGIN EXITOSO')
        setUser(data.user)
        setToken(data.token)
        setIsAuthenticated(true)
        localStorage.setItem('token', data.token)
        return { success: true, user: data.user, message: data.message }
      } else {
        console.log('❌ LOGIN FALLÓ:', data)
        return {
          success: false,
          error: data.error || `Credenciales inválidas`
        }
      }
    } catch (error) {
      console.error('💥 ERROR DE CONEXIÓN EN LOGIN:', error)

      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return {
          success: false,
          error: 'No se puede conectar al servidor.'
        }
      }

      return {
        success: false,
        error: `Error de conexión: ${error.message}`
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    console.log('🚪 Cerrando sesión')
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem('token')
  }

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuthStatus
  }

  // Log de estado actual
  console.log('🔍 AuthContext State:', {
    isAuthenticated,
    isLoading,
    hasUser: !!user,
    userName: user?.name,
    apiUrl: API_BASE_URL
  })

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
