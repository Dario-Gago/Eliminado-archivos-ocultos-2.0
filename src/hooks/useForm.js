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
