import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  FileX,
  Shield,
  Sparkles,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const { login, register, isLoading, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Obtener la ruta de redirección
  const from = location.state?.from?.pathname || '/dashboard'

  // Redireccionar si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  // Limpiar errores y formulario cuando cambie el modo
  useEffect(() => {
    setSubmitError('')
    setSubmitSuccess('')
    setErrors({})
    setFormData({
      name: '',
      email: '',
      password: ''
    })
  }, [isRegister])

  // Validaciones del lado del cliente
  const validateField = (name, value) => {
    const newErrors = { ...errors }

    switch (name) {
      case 'name':
        if (isRegister) {
          if (!value.trim()) {
            newErrors.name = 'El nombre es requerido'
          } else if (value.trim().length < 2) {
            newErrors.name = 'El nombre debe tener al menos 2 caracteres'
          } else if (value.trim().length > 50) {
            newErrors.name = 'El nombre no puede exceder 50 caracteres'
          } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
            newErrors.name = 'El nombre solo puede contener letras y espacios'
          } else {
            delete newErrors.name
          }
        }
        break

      case 'email':
        if (!value) {
          newErrors.email = 'El email es requerido'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Ingresa un email válido'
        } else if (value.length > 255) {
          newErrors.email = 'El email no puede exceder 255 caracteres'
        } else {
          delete newErrors.email
        }
        break

      case 'password':
        if (!value) {
          newErrors.password = 'La contraseña es requerida'
        } else if (value.length < 6) {
          newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
        } else if (value.length > 128) {
          newErrors.password = 'La contraseña no puede exceder 128 caracteres'
        } else if (
          isRegister &&
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)
        ) {
          newErrors.password =
            'La contraseña debe contener al menos: una minúscula, una mayúscula y un número'
        } else {
          delete newErrors.password
        }
        break

      default:
        break
    }

    setErrors(newErrors)
    return !newErrors[name]
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    // Limpiar errores cuando el usuario escriba
    if (errors[name]) {
      const newErrors = { ...errors }
      delete newErrors[name]
      setErrors(newErrors)
    }

    // Limpiar errores de submit
    if (submitError) setSubmitError('')
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    validateField(name, value)
  }

  const validateForm = () => {
    const fieldsToValidate = isRegister
      ? ['name', 'email', 'password']
      : ['email', 'password']

    let isValid = true

    fieldsToValidate.forEach((field) => {
      const fieldValid = validateField(field, formData[field])
      if (!fieldValid) isValid = false
    })

    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess('')

    // Validar formulario
    if (!validateForm()) {
      setSubmitError('Por favor corrige los errores en el formulario')
      return
    }

    console.log('📝 Formulario enviado:', {
      isRegister,
      email: formData.email,
      hasName: !!formData.name,
      hasPassword: !!formData.password
    })

    try {
      let result

      if (isRegister) {
        console.log('🔄 Iniciando proceso de registro...')
        result = await register(
          formData.name,
          formData.email,
          formData.password
        )
      } else {
        console.log('🔄 Iniciando proceso de login...')
        result = await login(formData.email, formData.password)
      }

      console.log('📊 Resultado:', result)

      if (result.success) {
        const message =
          result.message ||
          (isRegister
            ? 'Registro exitoso! Redirigiendo...'
            : 'Login exitoso! Redirigiendo...')

        setSubmitSuccess(message)

        // Redireccionar después de un breve delay
        setTimeout(() => {
          navigate(from, { replace: true })
        }, 1500)
      } else {
        setSubmitError(result.error || 'Error desconocido')
      }
    } catch (error) {
      console.error('💥 Error en handleSubmit:', error)
      setSubmitError('Error inesperado. Por favor intenta nuevamente.')
    }
  }

  const toggleMode = (newMode) => {
    setIsRegister(newMode)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#332e1d] via-gray-900 to-[#2a261a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#5ac7aa]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#5ac7aa]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#5ac7aa]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#5ac7aa] to-[#4ba88d] rounded-full shadow-2xl">
              <FileX className="w-10 h-10 text-white" />
              <Sparkles className="w-4 h-4 text-white absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-white to-[#5ac7aa] bg-clip-text text-transparent">
              {isRegister ? 'Crear Cuenta' : 'Bienvenido de vuelta'}
            </span>
          </h1>

          <p className="text-gray-300">
            {isRegister
              ? 'Únete para acceder a la herramienta de limpieza'
              : 'Inicia sesión para continuar con la limpieza'}
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Mostrar mensajes de error o éxito */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-300 text-sm">{submitError}</span>
            </div>
          )}

          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-green-300 text-sm">{submitSuccess}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex bg-white/10 rounded-xl p-1 mb-6">
              <button
                type="button"
                onClick={() => toggleMode(false)}
                disabled={isLoading}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  !isRegister
                    ? 'bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] text-[#332e1d] shadow-lg'
                    : 'text-gray-300 hover:text-white'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => toggleMode(true)}
                disabled={isLoading}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  isRegister
                    ? 'bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] text-[#332e1d] shadow-lg'
                    : 'text-gray-300 hover:text-white'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Registrarse
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo nombre (solo registro) */}
              {isRegister && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-[#5ac7aa] mb-3 uppercase tracking-wide"
                  >
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isLoading}
                      className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#5ac7aa] focus:border-[#5ac7aa] transition-all duration-300 backdrop-blur-sm ${
                        errors.name
                          ? 'border-red-400/50 focus:ring-red-400'
                          : 'border-white/20'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="Tu nombre completo"
                    />
                    {errors.name && (
                      <div className="mt-2 flex items-center space-x-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Campo email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-[#5ac7aa] mb-3 uppercase tracking-wide"
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#5ac7aa] focus:border-[#5ac7aa] transition-all duration-300 backdrop-blur-sm ${
                      errors.email
                        ? 'border-red-400/50 focus:ring-red-400'
                        : 'border-white/20'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <div className="mt-2 flex items-center space-x-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Campo password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-[#5ac7aa] mb-3 uppercase tracking-wide"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                    className={`w-full pl-12 pr-12 py-4 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#5ac7aa] focus:border-[#5ac7aa] transition-all duration-300 backdrop-blur-sm ${
                      errors.password
                        ? 'border-red-400/50 focus:ring-red-400'
                        : 'border-white/20'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    disabled={isLoading}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#5ac7aa] transition-colors disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {errors.password && (
                    <div className="mt-2 flex items-center space-x-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>
                {isRegister && (
                  <div className="mt-2 text-xs text-gray-400">
                    Debe contener al menos: 6 caracteres, una minúscula, una
                    mayúscula y un número
                  </div>
                )}
              </div>

              {/* Botón submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] text-[#332e1d] font-bold py-4 px-6 rounded-xl hover:from-[#4ba88d] hover:to-[#5ac7aa] transition-all duration-300 shadow-2xl hover:shadow-[#5ac7aa]/40 transform hover:-translate-y-1 hover:scale-[1.02] flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>
                      {isRegister ? 'Creando cuenta...' : 'Iniciando sesión...'}
                    </span>
                  </>
                ) : (
                  <>
                    {isRegister ? (
                      <User className="w-5 h-5" />
                    ) : (
                      <LogIn className="w-5 h-5" />
                    )}
                    <span>
                      {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-[#5ac7aa]/10 to-[#4ba88d]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#5ac7aa]/20">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Shield className="w-5 h-5 text-[#5ac7aa]" />
              <span className="text-white font-semibold">
                Seguridad garantizada
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              Tus datos están protegidos con encriptación de nivel empresarial.
              Nunca compartimos tu información personal.
            </p>
          </div>
        </div>

        {/* Información de debugging en desarrollo */}
        {import.meta.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg text-xs text-gray-400">
            <div>🔧 Debug Info:</div>
            <div>
              • Backend:{' '}
              {import.meta.env.VITE_API_URL || 'http://localhost:3001'}
            </div>
            <div>• Modo: {isRegister ? 'Registro' : 'Login'}</div>
            <div>• Loading: {isLoading ? 'Sí' : 'No'}</div>
            <div>• Errores: {Object.keys(errors).length}</div>
            <div>• Autenticado: {isAuthenticated ? 'Sí' : 'No'}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
