import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Github,
  Chrome
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Limpiar errores cuando el usuario escriba
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    console.log('Formulario enviado:', { isRegister, email: formData.email })

    try {
      let result

      if (isRegister) {
        console.log('Iniciando proceso de registro...')
        if (!formData.name || !formData.email || !formData.password) {
          setError('Todos los campos son requeridos')
          setIsLoading(false)
          return
        }

        result = await register(
          formData.name,
          formData.email,
          formData.password
        )
      } else {
        console.log('Iniciando proceso de login...')
        if (!formData.email || !formData.password) {
          setError('Email y contraseña son requeridos')
          setIsLoading(false)
          return
        }

        result = await login(formData.email, formData.password)
      }

      console.log('Resultado:', result)

      if (result.success) {
        setSuccess(
          isRegister
            ? 'Registro exitoso! Redirigiendo...'
            : 'Login exitoso! Redirigiendo...'
        )
        setTimeout(() => {
          navigate('/dashboard')
        }, 1500)
      } else {
        setError(result.error || 'Error desconocido')
      }
    } catch (error) {
      console.error('Error en handleSubmit:', error)
      setError('Error de conexión. Verifica que el servidor esté corriendo.')
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#332e1d] via-gray-900 to-[#2a261a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#5ac7aa]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#5ac7aa]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#5ac7aa]/10 rounded-full blur-3xl"></div>
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
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl text-green-300 text-sm">
              {success}
            </div>
          )}

          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex bg-white/10 rounded-xl p-1 mb-6">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(false)
                  setError('')
                  setSuccess('')
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  !isRegister
                    ? 'bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] text-[#332e1d] shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRegister(true)
                  setError('')
                  setSuccess('')
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  isRegister
                    ? 'bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] text-[#332e1d] shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
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
                      required={isRegister}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#5ac7aa] focus:border-[#5ac7aa] transition-all duration-300 backdrop-blur-sm"
                      placeholder="Tu nombre completo"
                    />
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
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#5ac7aa] focus:border-[#5ac7aa] transition-all duration-300 backdrop-blur-sm"
                    placeholder="tu@email.com"
                  />
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
                    required
                    className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#5ac7aa] focus:border-[#5ac7aa] transition-all duration-300 backdrop-blur-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#5ac7aa] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Botón submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] text-[#332e1d] font-bold py-4 px-6 rounded-xl hover:from-[#4ba88d] hover:to-[#5ac7aa] transition-all duration-300 shadow-2xl hover:shadow-[#5ac7aa]/40 transform hover:-translate-y-1 hover:scale-[1.02] flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#332e1d]/30 border-t-[#332e1d] rounded-full animate-spin"></div>
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
      </div>
    </div>
  )
}

export default Login
