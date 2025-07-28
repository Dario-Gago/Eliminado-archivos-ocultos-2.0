// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { API_ENDPOINTS, API_CONFIG } from '../config/api'

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
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verificar autenticación al cargar
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken) {
      console.log('🔍 Token encontrado, verificando con backend...')

      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(
          () => controller.abort(),
          API_CONFIG.TIMEOUT
        )

        const response = await fetch(API_ENDPOINTS.VERIFY, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          },
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          const data = await response.json()
          console.log('✅ Token válido, usuario autenticado:', data.user)

          setToken(storedToken)
          setUser(data.user)
          setIsAuthenticated(true)

          // Actualizar localStorage con datos más recientes
          localStorage.setItem('user', JSON.stringify(data.user))
        } else {
          console.log('❌ Token inválido, limpiando localStorage')
          logout()
        }
      } catch (error) {
        console.error('❌ Error verificando token:', error)

        // Si hay error de red pero tenemos datos locales, usar temporalmente
        if (storedUser && error.name !== 'AbortError') {
          try {
            const userData = JSON.parse(storedUser)
            setToken(storedToken)
            setUser(userData)
            setIsAuthenticated(true)
            console.log('⚠️ Usando datos locales temporalmente')
          } catch (parseError) {
            logout()
          }
        } else {
          logout()
        }
      }
    } else {
      console.log('ℹ️ No hay token guardado')
    }

    setIsLoading(false)
  }

  const register = async (name, email, password) => {
    console.log('🚀 INICIANDO REGISTRO REAL CON BACKEND')
    console.log('📝 Datos:', { name, email, password: '***' })
    console.log('🌐 URL:', API_ENDPOINTS.REGISTER)

    setIsLoading(true)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT)

      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      console.log('📡 Respuesta del servidor:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      })

      const data = await response.json()
      console.log('📦 Datos recibidos:', data)

      if (response.ok && data.token && data.user) {
        console.log('✅ REGISTRO EXITOSO')

        setUser(data.user)
        setToken(data.token)
        setIsAuthenticated(true)

        // Guardar en localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        return {
          success: true,
          user: data.user,
          message: data.message || 'Registro exitoso'
        }
      } else {
        console.log('❌ REGISTRO FALLÓ:', data)
        return {
          success: false,
          error:
            data.error ||
            data.message ||
            `Error del servidor: ${response.status}`
        }
      }
    } catch (error) {
      console.error('💥 ERROR DE CONEXIÓN EN REGISTRO:', error)

      let errorMessage = 'Error de conexión'

      if (error.name === 'AbortError') {
        errorMessage = 'La petición tardó demasiado tiempo'
      } else if (
        error.name === 'TypeError' &&
        error.message.includes('fetch')
      ) {
        errorMessage =
          'No se puede conectar al servidor. ¿Está corriendo en http://localhost:3001?'
      } else {
        errorMessage = error.message
      }

      return {
        success: false,
        error: errorMessage
      }
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email, password) => {
    console.log('🚀 INICIANDO LOGIN REAL CON BACKEND')
    console.log('📝 Email:', email)
    console.log('🌐 URL:', API_ENDPOINTS.LOGIN)

    setIsLoading(true)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT)

      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      console.log('📡 Respuesta del servidor:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      })

      const data = await response.json()
      console.log('📦 Datos recibidos:', data)

      if (response.ok && data.token && data.user) {
        console.log('✅ LOGIN EXITOSO')

        setUser(data.user)
        setToken(data.token)
        setIsAuthenticated(true)

        // Guardar en localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        return {
          success: true,
          user: data.user,
          message: data.message || 'Login exitoso'
        }
      } else {
        console.log('❌ LOGIN FALLÓ:', data)
        return {
          success: false,
          error: data.error || data.message || 'Credenciales inválidas'
        }
      }
    } catch (error) {
      console.error('💥 ERROR DE CONEXIÓN EN LOGIN:', error)

      let errorMessage = 'Error de conexión'

      if (error.name === 'AbortError') {
        errorMessage = 'La petición tardó demasiado tiempo'
      } else if (
        error.name === 'TypeError' &&
        error.message.includes('fetch')
      ) {
        errorMessage = 'No se puede conectar al servidor.'
      } else {
        errorMessage = error.message
      }

      return {
        success: false,
        error: errorMessage
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    console.log('🚪 Cerrando sesión')

    // Intentar cerrar sesión en el backend
    if (token) {
      try {
        await fetch(API_ENDPOINTS.LOGOUT, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
      } catch (error) {
        console.error('Error cerrando sesión en backend:', error)
        // No importa si falla, limpiamos localmente de todas formas
      }
    }

    // Limpiar estado local
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuthStatus,
    updateUser
  }

  // Log de estado actual para debugging
  console.log('🔍 AuthContext State:', {
    isAuthenticated,
    isLoading,
    hasUser: !!user,
    userName: user?.name,
    userEmail: user?.email
  })

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
