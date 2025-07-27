// src/hooks/useApi.js
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNotification } from '../contexts/NotificationContext'

export const useApi = () => {
  const { token } = useAuth()
  const { showError } = useNotification()
  const [loading, setLoading] = useState(false)

  const apiCall = async (url, options = {}) => {
    try {
      setLoading(true)

      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers
        },
        ...options
      }

      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición')
      }

      return { success: true, data }
    } catch (error) {
      showError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  return { apiCall, loading }
}

// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue, removeValue]
}

// src/hooks/useDebounce.js
import { useState, useEffect } from 'react'

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// src/hooks/useForm.js
import { useState } from 'react'

export const useForm = (initialValues, validationRules = {}) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setValues((prev) => ({
      ...prev,
      [name]: newValue
    }))

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }))

    // Validar campo cuando pierde el foco
    validateField(name, values[name])
  }

  const validateField = (name, value) => {
    const rules = validationRules[name]
    if (!rules) return true

    let error = ''

    if (rules.required && (!value || value.toString().trim() === '')) {
      error = rules.required
    } else if (rules.minLength && value.length < rules.minLength) {
      error = `Mínimo ${rules.minLength} caracteres`
    } else if (rules.maxLength && value.length > rules.maxLength) {
      error = `Máximo ${rules.maxLength} caracteres`
    } else if (rules.pattern && !rules.pattern.test(value)) {
      error = rules.patternMessage || 'Formato inválido'
    } else if (rules.custom && !rules.custom(value)) {
      error = rules.customMessage || 'Valor inválido'
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }))

    return !error
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    Object.keys(validationRules).forEach((field) => {
      const fieldValid = validateField(field, values[field])
      if (!fieldValid) {
        isValid = false
      }
    })

    return isValid
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setValues,
    setErrors
  }
}

// src/hooks/useFileUpload.js
import { useState } from 'react'
import { useNotification } from '../contexts/NotificationContext'

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { showSuccess, showError } = useNotification()

  const uploadFile = async (file, endpoint) => {
    try {
      setUploading(true)
      setProgress(0)

      const formData = new FormData()
      formData.append('file', file)

      const xhr = new XMLHttpRequest()

      return new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentProgress = (e.loaded / e.total) * 100
            setProgress(Math.round(percentProgress))
          }
        })

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText)
            showSuccess('Archivo subido correctamente')
            resolve(response)
          } else {
            const error = JSON.parse(xhr.responseText)
            showError(error.message || 'Error subiendo archivo')
            reject(new Error(error.message))
          }
        })

        xhr.addEventListener('error', () => {
          showError('Error de conexión')
          reject(new Error('Error de conexión'))
        })

        xhr.open('POST', endpoint)
        xhr.send(formData)
      })
    } catch (error) {
      showError(error.message)
      throw error
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  return {
    uploadFile,
    uploading,
    progress
  }
}
