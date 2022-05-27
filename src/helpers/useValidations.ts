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

type UseValidationsReturnType = {
  errors: Errors
  validate: (validations: Validations) => boolean
  cleanErrors: () => void
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

  const cleanErrors = () => setErrors({})

  return { errors, validate, cleanErrors }
}
