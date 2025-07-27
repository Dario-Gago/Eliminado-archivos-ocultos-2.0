// src/pages/Dashboard.js
import React, { useState } from 'react'
import { useFiles } from '../contexts/FileContext'
import { useAuth } from '../contexts/AuthContext'
import { useNotification } from '../contexts/NotificationContext'
import {
  FolderOpen,
  Trash2,
  FileX,
  CheckSquare,
  Square,
  Download,
  RefreshCw,
  LogOut,
  User
} from 'lucide-react'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const {
    selectedFolder,
    hiddenFiles,
    isScanning,
    isDeleting,
    scanProgress,
    selectedFiles,
    totalSize,
    scanFolder,
    deleteFiles,
    selectFile,
    selectAllFiles,
    clearScan,
    formatFileSize
  } = useFiles()
  const { showSuccess, showError } = useNotification()

  const [folderInput, setFolderInput] = useState('')

  const handleScanFolder = async () => {
    if (!folderInput.trim()) {
      showError('Por favor ingresa una ruta de carpeta')
      return
    }

    const result = await scanFolder(folderInput)
    if (result.success) {
      showSuccess('Escaneo completado')
    } else {
      showError(result.error)
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedFiles.length === 0) {
      showError('Selecciona al menos un archivo para eliminar')
      return
    }

    if (
      window.confirm(
        `¿Estás seguro de eliminar ${selectedFiles.length} archivo(s)?`
      )
    ) {
      const result = await deleteFiles(selectedFiles)
      if (result.success) {
        showSuccess(
          `${result.deletedCount} archivo(s) eliminado(s) correctamente`
        )
      } else {
        showError(result.error)
      }
    }
  }

  const selectedSize = selectedFiles.reduce((total, path) => {
    const file = hiddenFiles.find((f) => f.path === path)
    return total + (file ? file.size : 0)
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#332e1d] via-gray-900 to-[#2a261a] py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-[#5ac7aa] to-[#4ba88d] rounded-2xl p-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Bienvenido, {user?.name}
                </h1>
                <p className="text-gray-300">Panel de control de limpieza</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-xl transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* Selector de carpeta */}
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <FolderOpen className="w-7 h-7 text-[#5ac7aa]" />
            <span>Seleccionar Carpeta</span>
          </h2>

          <div className="flex space-x-4">
            <input
              type="text"
              value={folderInput}
              onChange={(e) => setFolderInput(e.target.value)}
              placeholder="Ej: /Users/usuario/Documents"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#5ac7aa] focus:border-[#5ac7aa] transition-all duration-300"
            />
            <button
              onClick={handleScanFolder}
              disabled={isScanning}
              className="bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] text-[#332e1d] font-bold px-6 py-3 rounded-xl hover:from-[#4ba88d] hover:to-[#5ac7aa] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Escaneando...</span>
                </>
              ) : (
                <>
                  <FileX className="w-5 h-5" />
                  <span>Escanear</span>
                </>
              )}
            </button>
          </div>

          {/* Progreso del escaneo */}
          {isScanning && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Progreso del escaneo</span>
                <span className="text-[#5ac7aa] font-semibold">
                  {scanProgress}%
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-[#5ac7aa] to-[#4ba88d] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Estadísticas */}
        {hiddenFiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="text-center">
                <FileX className="w-8 h-8 text-[#5ac7aa] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {hiddenFiles.length}
                </div>
                <div className="text-gray-300 text-sm">
                  Archivos encontrados
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="text-center">
                <CheckSquare className="w-8 h-8 text-[#5ac7aa] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {selectedFiles.length}
                </div>
                <div className="text-gray-300 text-sm">Seleccionados</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="text-center">
                <Download className="w-8 h-8 text-[#5ac7aa] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {formatFileSize(totalSize)}
                </div>
                <div className="text-gray-300 text-sm">Tamaño total</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="text-center">
                <Trash2 className="w-8 h-8 text-[#5ac7aa] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {formatFileSize(selectedSize)}
                </div>
                <div className="text-gray-300 text-sm">A eliminar</div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de archivos */}
        {hiddenFiles.length > 0 && (
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                <FileX className="w-7 h-7 text-[#5ac7aa]" />
                <span>Archivos Ocultos Encontrados</span>
              </h2>

              <div className="flex space-x-3">
                <button
                  onClick={selectAllFiles}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2"
                >
                  {selectedFiles.length === hiddenFiles.length ? (
                    <CheckSquare className="w-5 h-5" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                  <span>Seleccionar todo</span>
                </button>

                <button
                  onClick={handleDeleteSelected}
                  disabled={selectedFiles.length === 0 || isDeleting}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-6 py-2 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isDeleting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Eliminando...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      <span>Eliminar Seleccionados</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {hiddenFiles.map((file, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                    selectedFiles.includes(file.path)
                      ? 'bg-[#5ac7aa]/20 border border-[#5ac7aa]/30'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}
                  onClick={() => selectFile(file.path)}
                >
                  <div className="flex-shrink-0">
                    {selectedFiles.includes(file.path) ? (
                      <CheckSquare className="w-5 h-5 text-[#5ac7aa]" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">
                      {file.name}
                    </div>
                    <div className="text-gray-400 text-sm truncate">
                      {file.path}
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <div className="text-[#5ac7aa] font-semibold">
                      {formatFileSize(file.size)}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {new Date(file.lastModified).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {!selectedFolder && !isScanning && (
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl text-center">
            <FolderOpen className="w-16 h-16 text-[#5ac7aa] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Selecciona una carpeta para comenzar
            </h3>
            <p className="text-gray-300">
              Ingresa la ruta de la carpeta que deseas escanear en busca de
              archivos ocultos
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
