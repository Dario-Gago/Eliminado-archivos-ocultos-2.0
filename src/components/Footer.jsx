import React from 'react'
import {
  FileX,
  Github,
  Linkedin,
  Mail,
  Heart,
  Shield,
  Code,
  Coffee
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-[#332e1d] to-[#2a261a] text-white border-t border-[#5ac7aa]/20">
      {/* Sección principal */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-[#5ac7aa] to-[#4ba88d] p-2 rounded-lg shadow-lg">
                <FileX className="w-6 h-6 text-[#332e1d]" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-[#5ac7aa] bg-clip-text text-transparent">
                Borrado de archivos ocultos
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Herramienta profesional para la eliminación segura de archivos
              ocultos y optimización del sistema.
            </p>
            <div className="flex items-center space-x-2 text-[#5ac7aa]">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Seguro y confiable</span>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#5ac7aa]">
              Enlaces rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-[#5ac7aa] transition-colors duration-200 text-sm flex items-center space-x-2"
                >
                  <span>Inicio</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-[#5ac7aa] transition-colors duration-200 text-sm flex items-center space-x-2"
                >
                  <span>Contacto</span>
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-300 hover:text-[#5ac7aa] transition-colors duration-200 text-sm flex items-center space-x-2"
                >
                  <span>Política de privacidad</span>
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-300 hover:text-[#5ac7aa] transition-colors duration-200 text-sm flex items-center space-x-2"
                >
                  <span>Términos de uso</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto del desarrollador */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#5ac7aa]">
              Desarrollador
            </h3>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-[#5ac7aa]/10 to-transparent p-4 rounded-lg border border-[#5ac7aa]/20">
                <div className="flex items-center space-x-3 mb-2">
                  <Code className="w-5 h-5 text-[#5ac7aa]" />
                  <span className="font-semibold text-white">Dario Gago</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Desarrollador Full Stack
                </p>
              </div>

              {/* Redes sociales */}
              <div className="flex space-x-3">
                <a
                  href="mailto:gagodario1@gmail.com"
                  className="bg-[#5ac7aa]/10 p-2 rounded-lg hover:bg-[#5ac7aa]/20 transition-all duration-200 border border-[#5ac7aa]/30 hover:border-[#5ac7aa]/50"
                  title="Enviar email"
                >
                  <Mail className="w-4 h-4 text-[#5ac7aa]" />
                </a>
                <a
                  href="https://github.com/Dario-Gago"
                  className="bg-[#5ac7aa]/10 p-2 rounded-lg hover:bg-[#5ac7aa]/20 transition-all duration-200 border border-[#5ac7aa]/30 hover:border-[#5ac7aa]/50"
                  title="GitHub"
                >
                  <Github className="w-4 h-4 text-[#5ac7aa]" />
                </a>
                <a
                  href="https://www.linkedin.com/in/dario-gago-4a147a319/"
                  className="bg-[#5ac7aa]/10 p-2 rounded-lg hover:bg-[#5ac7aa]/20 transition-all duration-200 border border-[#5ac7aa]/30 hover:border-[#5ac7aa]/50"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-[#5ac7aa]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Línea divisora con gradiente */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#5ac7aa]/30 to-transparent"></div>

      {/* Copyright */}
      <div className="px-6 py-6 bg-[#2a261a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>
              © {currentYear} Dario Gago. Todos los derechos reservados.
            </span>
          </div>

          <div className="flex items-center space-x-3 text-gray-400 text-sm">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
            <span>y</span>
            <Coffee className="w-4 h-4 text-[#5ac7aa]" />
            <span>por Dario</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
