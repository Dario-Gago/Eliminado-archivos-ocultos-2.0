// src/contexts/NotificationContext.js
import React, { createContext, useContext, useState } from 'react'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotification debe ser usado dentro de un NotificationProvider'
    )
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random()
    const notification = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration,
      timestamp: new Date()
    }

    setNotifications((prev) => [...prev, notification])

    // Auto-remover después del tiempo especificado
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  // Métodos de conveniencia
  const showSuccess = (message, duration) =>
    addNotification(message, 'success', duration)
  const showError = (message, duration) =>
    addNotification(message, 'error', duration)
  const showWarning = (message, duration) =>
    addNotification(message, 'warning', duration)
  const showInfo = (message, duration) =>
    addNotification(message, 'info', duration)

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}
