import { useState } from 'react'
import { useToast } from './useToast'

type CreateValidation = (
  validator: () => boolean,
  errorMessage?: string,
  successMessage?: string
) => void

type Validation = (createValidation: CreateValidation) => void

type Validations = Record<string, Validation>

type Errors = { name: string } | Record<string, never>

export const useValidations = () => {
  const [errors, setErrors] = useState<Errors>({})
  const toast = useToast()

  const validate = (validations: Validations) => {
    for (const validation in validations) {
      validations[validation]((validator, errorMessage, successMessage) => {
        if (validator() && successMessage) {
          toast.show({ description: successMessage, variant: 'success' })
          return true
        }
        if (validator() === false) {
          setErrors({ ...errors, name: errorMessage || 'error' })
          toast.show({
            description: errorMessage || 'error',
            variant: 'error',
          })
          return false
        }
      })
    }
  }

  const cleanErrors = () => setErrors({})

  return [errors, validate, cleanErrors] as [
    Errors,
    (validations: Validations) => boolean,
    () => void
  ]
}
