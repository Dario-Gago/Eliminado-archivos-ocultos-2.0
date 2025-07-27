// src/contexts/FileContext.js
import React, { createContext, useContext, useState } from 'react'
import { useAuth } from './AuthContext'

const FileContext = createContext()

export const useFiles = () => {
  const context = useContext(FileContext)
  if (!context) {
    throw new Error('useFiles debe ser usado dentro de un FileProvider')
  }
  return context
}

export const FileProvider = ({ children }) => {
  const { token } = useAuth()
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [hiddenFiles, setHiddenFiles] = useState([])
  const [isScanning, setIsScanning] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [totalSize, setTotalSize] = useState(0)

  const scanFolder = async (folderPath) => {
    try {
      setIsScanning(true)
      setScanProgress(0)
      setHiddenFiles([])
      setSelectedFolder(folderPath)

      const response = await fetch('/api/files/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ folderPath })
      })

      if (response.ok) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n').filter((line) => line.trim())

          for (const line of lines) {
            try {
              const data = JSON.parse(line)

              if (data.type === 'progress') {
                setScanProgress(data.progress)
              } else if (data.type === 'file') {
                setHiddenFiles((prev) => [...prev, data.file])
                setTotalSize((prev) => prev + data.file.size)
              } else if (data.type === 'complete') {
                setIsScanning(false)
                setScanProgress(100)
              }
            } catch (e) {
              // Ignorar líneas que no sean JSON válido
            }
          }
        }

        return { success: true }
      } else {
        const error = await response.json()
        setIsScanning(false)
        return { success: false, error: error.message }
      }
    } catch (error) {
      console.error('Error escaneando carpeta:', error)
      setIsScanning(false)
      return { success: false, error: 'Error de conexión' }
    }
  }

  const deleteFiles = async (filePaths) => {
    try {
      setIsDeleting(true)

      const response = await fetch('/api/files/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ files: filePaths })
      })

      const data = await response.json()

      if (response.ok) {
        // Actualizar la lista removiendo archivos eliminados
        setHiddenFiles((prev) =>
          prev.filter((file) => !filePaths.includes(file.path))
        )
        setSelectedFiles([])

        // Recalcular tamaño total
        const deletedSize = filePaths.reduce((total, path) => {
          const file = hiddenFiles.find((f) => f.path === path)
          return total + (file ? file.size : 0)
        }, 0)
        setTotalSize((prev) => prev - deletedSize)

        return { success: true, deletedCount: data.deletedCount }
      } else {
        return { success: false, error: data.message }
      }
    } catch (error) {
      console.error('Error eliminando archivos:', error)
      return { success: false, error: 'Error de conexión' }
    } finally {
      setIsDeleting(false)
    }
  }

  const selectFile = (filePath) => {
    setSelectedFiles((prev) => {
      if (prev.includes(filePath)) {
        return prev.filter((path) => path !== filePath)
      } else {
        return [...prev, filePath]
      }
    })
  }

  const selectAllFiles = () => {
    if (selectedFiles.length === hiddenFiles.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(hiddenFiles.map((file) => file.path))
    }
  }

  const clearScan = () => {
    setSelectedFolder(null)
    setHiddenFiles([])
    setSelectedFiles([])
    setTotalSize(0)
    setScanProgress(0)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const value = {
    // Estados
    selectedFolder,
    hiddenFiles,
    isScanning,
    isDeleting,
    scanProgress,
    selectedFiles,
    totalSize,

    // Acciones
    scanFolder,
    deleteFiles,
    selectFile,
    selectAllFiles,
    clearScan,

    // Utilidades
    formatFileSize
  }

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>
}
