import { useState } from 'react'
import { useToast } from './useToast'

interface ICreateValidation {
  validator: () => boolean
  errorMessage?: string
  successMessage?: string
  showToast?: boolean
}

type CreateValidation = (config: ICreateValidation) => void

type Validation = (createValidation: CreateValidation) => void

type Validations = Record<string, Validation>

// TODO: type validationName with generics
type Errors = { [validationName: string]: string } | Record<string, never>

export const useValidations = () => {
  const [errors, setErrors] = useState<Errors>({})
  const toast = useToast()

  const validate = (validations: Validations) => {
    for (const validation in validations) {
      validations[validation](
        ({
          validator,
          errorMessage = 'error',
          successMessage,
          showToast = true,
        }) => {
          if (validator() && successMessage) {
            showToast &&
              toast.show({ description: successMessage, variant: 'success' })
            return true
          }
          if (!validator()) {
            // TODO: type validationName with generics
            setErrors({ ...errors, [validation]: errorMessage })

            showToast &&
              toast.show({
                description: errorMessage,
                variant: 'error',
              })
            return false
          }
        }
      )
    }
  }

  const cleanErrors = () => setErrors({})

  return [errors, validate, cleanErrors] as [
    Errors,
    (validations: Validations) => boolean,
    () => void
  ]
}
