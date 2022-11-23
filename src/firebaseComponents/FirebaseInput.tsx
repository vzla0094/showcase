import { FormEvent } from 'react'
import { Formik } from 'formik'
import { FormControl, IFormControlProps, Input } from 'native-base'
import * as yup from 'yup'
import { IFirebaseInputField } from '../types'

interface IFirebaseInputProps extends IFormControlProps {
  fieldKey: string
  label?: string
  placeholder?: string
  multiline?: boolean
  initialValue?: string
  validationSchema: yup.AnySchema
  onSubmit: (field: IFirebaseInputField) => void
}

export const FirebaseInput = ({
  fieldKey,
  label,
  placeholder,
  multiline,
  initialValue = '',
  validationSchema,
  onSubmit,
  isRequired,
  ...props
}: IFirebaseInputProps) => {
  return (
    <Formik
      initialValues={{ value: initialValue }}
      validationSchema={yup.object({ value: validationSchema })}
      onSubmit={({ value }) => onSubmit({ fieldKey, value })}
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
