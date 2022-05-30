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
export type Errors =
  | { [validationName: string]: string }
  | Record<string, never>

type CleanAllErrorsType = () => void

type CleanErrorType = (error: string) => void

type UseValidationsReturnType = {
  errors: Errors
  validate: (validations: Validations) => boolean
  cleanAllErrors: CleanAllErrorsType
  cleanError: CleanErrorType
}

export const useValidations = (): UseValidationsReturnType => {
  const [errors, setErrors] = useState<Errors>({})
  const toast = useToast()

  const validate = (validations: Validations) => {
    let isValid: boolean | undefined = undefined

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
            isValid = isValid !== false // This will show subsequent errors in validations without returning a false positive
          }
          if (!validator()) {
            // TODO: type validationName with generics
            setErrors({ ...errors, [validation]: errorMessage })

            showToast &&
              toast.show({
                description: errorMessage,
                variant: 'error',
              })
            isValid = false
            return
          }
        }
      )
    }

    return !!isValid
  }

  const cleanAllErrors: CleanAllErrorsType = () => setErrors({})

  const cleanError: CleanErrorType = error =>
    setErrors(prevState => {
      const { [error]: removedError, ...newState } = prevState
      return newState
    })

  return { errors, validate, cleanAllErrors, cleanError }
}
