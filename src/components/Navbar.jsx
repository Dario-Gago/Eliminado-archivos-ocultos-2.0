import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, FileX, Shield, LogOut, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  const handleLoginClick = () => {
    navigate('/login')
    setIsOpen(false)
  }

  const handleDashboardClick = () => {
    navigate('/dashboard')
    setIsOpen(false)
  }

  return (
    <nav className="bg-gradient-to-r from-[#332e1d] via-[#3d3624] to-[#332e1d] text-white shadow-2xl border-b border-[#5ac7aa]/20">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 text-xl font-bold group"
        >
          <div className="bg-gradient-to-br from-[#5ac7aa] to-[#4ba88d] p-2 rounded-lg shadow-lg group-hover:shadow-[#5ac7aa]/30 transition-all duration-300">
            <FileX className="w-6 h-6 text-[#332e1d]" />
          </div>
          <span className="bg-gradient-to-r from-white to-[#5ac7aa] bg-clip-text text-transparent group-hover:from-[#5ac7aa] group-hover:to-white transition-all duration-300">
            Borrado de archivos ocultos
          </span>
        </Link>

        {/* Botón hamburguesa */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg bg-[#5ac7aa]/10 hover:bg-[#5ac7aa]/20 transition-all duration-200 border border-[#5ac7aa]/30"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-[#5ac7aa]" />
            ) : (
              <Menu className="w-6 h-6 text-[#5ac7aa]" />
            )}
          </button>
        </div>

        {/* Links (pantallas grandes) */}
        <ul className="hidden md:flex space-x-2 items-center">
          <li>
            <Link
              to="/"
              className="px-4 py-2 rounded-lg hover:bg-[#5ac7aa]/10 hover:text-[#5ac7aa] transition-all duration-200 border border-transparent hover:border-[#5ac7aa]/30 font-medium"
            >
              Inicio
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-lg hover:bg-[#5ac7aa]/10 hover:text-[#5ac7aa] transition-all duration-200 border border-transparent hover:border-[#5ac7aa]/30 font-medium"
            >
              Contacto
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <button
                  onClick={handleDashboardClick}
                  className="px-4 py-2 rounded-lg hover:bg-[#5ac7aa]/10 hover:text-[#5ac7aa] transition-all duration-200 border border-transparent hover:border-[#5ac7aa]/30 font-medium flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-300">
                    Hola, {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Salir</span>
                  </button>
                </div>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLoginClick}
                className="bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] text-[#332e1d] font-semibold px-6 py-2.5 rounded-lg hover:from-[#4ba88d] hover:to-[#5ac7aa] transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[#5ac7aa]/30 transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>Ingresar</span>
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Menú desplegable (pantallas pequeñas) */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-6 pb-6 bg-gradient-to-b from-[#332e1d] to-[#2a261a] border-t border-[#5ac7aa]/20">
          <ul className="space-y-3 pt-4">
            <li>
              <Link
                to="/"
                className="block px-4 py-3 rounded-lg hover:bg-[#5ac7aa]/10 hover:text-[#5ac7aa] transition-all duration-200 border border-transparent hover:border-[#5ac7aa]/30 font-medium"
                onClick={toggleMenu}
              >
                Inicio
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="block px-4 py-3 rounded-lg hover:bg-[#5ac7aa]/10 hover:text-[#5ac7aa] transition-all duration-200 border border-transparent hover:border-[#5ac7aa]/30 font-medium"
                onClick={toggleMenu}
              >
                Contacto
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li>
                  <button
                    onClick={handleDashboardClick}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#5ac7aa]/10 hover:text-[#5ac7aa] transition-all duration-200 border border-transparent hover:border-[#5ac7aa]/30 font-medium flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>
                </li>
                <li>
                  <div className="px-4 py-2 text-sm text-gray-300">
                    Conectado como: {user?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 mt-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLoginClick}
                  className="w-full bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] text-[#332e1d] font-semibold px-6 py-3 rounded-lg hover:from-[#4ba88d] hover:to-[#5ac7aa] transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Ingresar</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
