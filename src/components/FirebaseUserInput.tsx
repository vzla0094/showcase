import { FormEvent } from 'react'
import { Formik } from 'formik'
import { Input, FormControl, IFormControlProps } from 'native-base'
import { AnySchema } from 'yup'

import { IUser } from '../types'

interface IValue {
  value: string
}

interface FirebaseUserInputProps extends IFormControlProps {
  userKey: keyof IUser['details']
  label?: string
  placeholder?: string
  multiline?: boolean
  initialValue?: string
  visibility?: 'PUBLIC' | 'PRIVATE'
  validationSchema: AnySchema
  onSubmit: (data: IValue) => void
}

export const FirebaseUserInput = ({
  userKey,
  label,
  placeholder,
  multiline,
  initialValue = '',
  visibility = 'PRIVATE',
  validationSchema,
  onSubmit,
  isRequired,
  ...props
}: FirebaseUserInputProps) => {
  return (
    <Formik
      initialValues={{ value: initialValue }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <FormControl
          isRequired={isRequired}
          isInvalid={'value' in errors}
          width="100%"
          {...props}
        >
          {label ? <FormControl.Label>{label}</FormControl.Label> : null}

          <Input
            value={values.value}
            placeholder={placeholder}
            multiline={multiline}
            onChangeText={handleChange('value')}
            onBlur={(e: unknown) =>
              handleSubmit(e as FormEvent<HTMLFormElement>)
            }
            max
          />
          <FormControl.ErrorMessage>{errors.value}</FormControl.ErrorMessage>
        </FormControl>
      )}
    </Formik>
  )
}
