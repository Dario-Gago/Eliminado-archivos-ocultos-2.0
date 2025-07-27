import React, { useState } from 'react'
import {
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
  Star,
  Sparkles
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#332e1d] via-gray-900 to-[#2a261a] py-20 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#5ac7aa]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-60 right-20 w-40 h-40 bg-[#5ac7aa]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-32 w-28 h-28 bg-[#5ac7aa]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header mejorado */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#5ac7aa] to-[#4ba88d] rounded-full shadow-2xl">
              <MessageCircle className="w-10 h-10 text-white" />
              <Sparkles className="w-4 h-4 text-white absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-[#5ac7aa] to-white bg-clip-text text-transparent">
              Contáctanos
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            ¿Tienes alguna pregunta sobre nuestro software de borrado de
            archivos ocultos?
            <span className="text-[#5ac7aa] font-semibold">
              {' '}
              Estamos aquí para ayudarte.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Información de contacto mejorada */}
          <div className="space-y-10">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10 hover:border-[#5ac7aa]/30 transition-all duration-500">
              <div className="flex items-center space-x-3 mb-8">
                <Star className="w-6 h-6 text-[#5ac7aa]" />
                <h2 className="text-3xl font-bold text-white">
                  Información de contacto
                </h2>
              </div>

              <div className="space-y-8">
                <div className="group flex items-start space-x-5 p-6 rounded-2xl bg-gradient-to-r from-[#5ac7aa]/10 to-transparent hover:from-[#5ac7aa]/20 transition-all duration-300">
                  <div className="bg-gradient-to-br from-[#5ac7aa] to-[#4ba88d] p-4 rounded-xl shadow-lg group-hover:shadow-[#5ac7aa]/30 group-hover:scale-105 transition-all duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2 text-lg">Email</h3>
                    <p className="text-[#5ac7aa] text-lg font-medium">
                      gagodario1@gmail.com
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Respuesta garantizada en 24 horas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-gradient-to-br from-[#5ac7aa]/20 to-[#4ba88d]/10 backdrop-blur-xl rounded-3xl p-8 border border-[#5ac7aa]/20 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-[#5ac7aa]" />
                <span>Desarrollado por Dario Gago</span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Software especializado en la eliminación segura de archivos
                ocultos. Contacta directamente con el desarrollador para soporte
                técnico personalizado.
              </p>
            </div>
          </div>

          {/* Formulario de contacto mejorado */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10 hover:border-[#5ac7aa]/30 transition-all duration-500">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
              <Send className="w-7 h-7 text-[#5ac7aa]" />
              <span>Envíanos un mensaje</span>
            </h2>

            {isSubmitted && (
              <div className="mb-8 p-5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl flex items-center space-x-4 backdrop-blur-sm">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-green-300 font-medium">
                  ¡Mensaje enviado correctamente! Te responderemos pronto.
                </span>
              </div>
            )}

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-[#5ac7aa] mb-3 uppercase tracking-wide"
                  >
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#5ac7aa] focus:border-[#5ac7aa] transition-all duration-300 backdrop-blur-sm"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-[#5ac7aa] mb-3 uppercase tracking-wide"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#5ac7aa] focus:border-[#5ac7aa] transition-all duration-300 backdrop-blur-sm"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-bold text-[#5ac7aa] mb-3 uppercase tracking-wide"
                >
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#5ac7aa] focus:border-[#5ac7aa] transition-all duration-300 backdrop-blur-sm"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-[#5ac7aa] mb-3 uppercase tracking-wide"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#5ac7aa] focus:border-[#5ac7aa] transition-all duration-300 resize-none backdrop-blur-sm"
                  placeholder="Describe tu consulta o problema en detalle..."
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] text-[#332e1d] font-bold py-5 px-8 rounded-xl hover:from-[#4ba88d] hover:to-[#5ac7aa] transition-all duration-300 shadow-2xl hover:shadow-[#5ac7aa]/40 transform hover:-translate-y-1 hover:scale-[1.02] flex items-center justify-center space-x-3 text-lg group"
              >
                <Send className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Enviar mensaje</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
