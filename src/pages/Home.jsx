import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileX,
  Shield,
  Zap,
  CheckCircle,
  FolderOpen,
  Play,
  Star,
  Trash2,
  HardDrive,
  Lock,
  Sparkles,
  AlertTriangle,
  Clock,
  Users,
  TrendingUp,
  ArrowRight,
  LogIn
} from 'lucide-react'

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleSelectFolder = () => {
    // Navegar directamente al dashboard (asumiendo que ya está autenticado)
    window.location.href = '/dashboard'
  }

  const features = [
    {
      icon: <FileX className="w-8 h-8" />,
      title: 'Detección Inteligente',
      description:
        'Escanea y encuentra todos los archivos ocultos en tu sistema automáticamente'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Eliminación Segura',
      description:
        'Borra archivos de forma permanente sin posibilidad de recuperación'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Proceso Rápido',
      description: 'Limpieza completa del sistema en cuestión de minutos'
    },
    {
      icon: <HardDrive className="w-8 h-8" />,
      title: 'Interfaz Web',
      description: 'Accede desde cualquier navegador sin necesidad de descargas'
    }
  ]

  const stats = [
    {
      number: '50K+',
      label: 'Archivos eliminados',
      icon: <FileX className="w-6 h-6" />
    },
    {
      number: '99.9%',
      label: 'Efectividad',
      icon: <Shield className="w-6 h-6" />
    },
    {
      number: '1M+',
      label: 'Usuarios satisfechos',
      icon: <Users className="w-6 h-6" />
    },
    {
      number: '24/7',
      label: 'Soporte técnico',
      icon: <Clock className="w-6 h-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#332e1d] via-gray-900 to-[#2a261a] text-white relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#5ac7aa]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-80 right-20 w-80 h-80 bg-[#5ac7aa]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/2 w-96 h-96 bg-[#5ac7aa]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#5ac7aa]/20 to-[#4ba88d]/20 backdrop-blur-sm border border-[#5ac7aa]/30 rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-[#5ac7aa]" />
              <span className="text-[#5ac7aa] font-semibold">
                Herramienta web #1 en eliminación de archivos
              </span>
            </div>

            {/* Título principal */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-[#5ac7aa] to-white bg-clip-text text-transparent">
                Elimina Archivos
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] bg-clip-text text-transparent">
                Ocultos
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Herramienta web para detectar y eliminar archivos ocultos
              directamente desde tu navegador.
              <span className="text-[#5ac7aa] font-semibold">
                Rápido, seguro y sin descargas.
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={handleSelectFolder}
                className="group bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] text-[#332e1d] font-bold py-5 px-10 rounded-2xl hover:from-[#4ba88d] hover:to-[#5ac7aa] transition-all duration-300 shadow-2xl hover:shadow-[#5ac7aa]/40 transform hover:-translate-y-1 hover:scale-105 flex items-center space-x-3 text-lg"
              >
                <FolderOpen className="w-6 h-6 group-hover:animate-pulse" />
                <span>Seleccionar Carpeta</span>
              </button>

              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-5 px-10 rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-3 text-lg">
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Ver Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 group-hover:border-[#5ac7aa]/30 transition-all duration-300">
                    <div className="flex justify-center mb-3 text-[#5ac7aa]">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-[#5ac7aa] bg-clip-text text-transparent">
                Características Principales
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tecnología avanzada para una limpieza completa y segura de tu
              sistema
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-[#5ac7aa]/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="bg-gradient-to-br from-[#5ac7aa] to-[#4ba88d] rounded-2xl p-4 w-fit mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#5ac7aa] to-white bg-clip-text text-transparent">
                Cómo Funciona
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="bg-gradient-to-br from-[#5ac7aa] to-[#4ba88d] rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-[#5ac7aa]/20 to-[#4ba88d]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Iniciar Sesión
              </h3>
              <p className="text-gray-300">
                Accede a tu cuenta para usar la herramienta de limpieza
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="bg-gradient-to-br from-[#5ac7aa] to-[#4ba88d] rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-[#5ac7aa]/20 to-[#4ba88d]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Seleccionar Carpeta
              </h3>
              <p className="text-gray-300">
                Elige la carpeta que deseas escanear en busca de archivos
                ocultos
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="bg-gradient-to-br from-[#5ac7aa] to-[#4ba88d] rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-[#5ac7aa]/20 to-[#4ba88d]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Descarga</h3>
              <p className="text-gray-300">
                Descarga las carpetas sin los archivos ocultos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-[#5ac7aa] to-[#4ba88d] rounded-2xl p-4 shadow-2xl">
                <Trash2 className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-[#5ac7aa] bg-clip-text text-transparent">
                ¿Listo para limpiar tu sistema?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Inicia sesión y selecciona una carpeta para comenzar la limpieza
              de archivos ocultos directamente desde tu navegador.
            </p>
            <button
              onClick={handleSelectFolder}
              className="group bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] text-[#332e1d] font-bold py-6 px-12 rounded-2xl hover:from-[#4ba88d] hover:to-[#5ac7aa] transition-all duration-300 shadow-2xl hover:shadow-[#5ac7aa]/40 transform hover:-translate-y-1 hover:scale-105 flex items-center space-x-3 text-xl mx-auto"
            >
              <FolderOpen className="w-7 h-7 group-hover:animate-pulse" />
              <span>Seleccionar Carpeta</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-sm text-gray-400 mt-4">
              Requiere iniciar sesión para acceder a la herramienta
            </p>
          </div>
        </div>
      </section>

      {/* Modal de Login */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-br from-[#5ac7aa] to-[#4ba88d] rounded-2xl p-4 w-fit mx-auto mb-4">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Iniciar Sesión Requerido
              </h3>
              <p className="text-gray-300">
                Necesitas una cuenta para usar la herramienta de limpieza
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] text-[#332e1d] font-bold py-4 px-6 rounded-xl hover:from-[#4ba88d] hover:to-[#5ac7aa] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Iniciar Sesión</span>
              </button>

              <button
                onClick={() => setShowLoginModal(false)}
                className="w-full bg-white/10 border border-white/20 text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
