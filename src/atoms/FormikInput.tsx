import { FormControl, IFormControlProps, IInputProps, Input } from 'native-base'
import { FormikValues } from 'formik'

interface IFormikProps {
  handleBlur: FormikValues['handleBlur']
  handleChange: (value: string) => void
  errors: FormikValues['errors']
}

export interface IFormikInputProps extends IFormikProps {
  value: Partial<FormikValues>['values']
  fieldName: string
  label?: string
  placeholder?: string
  inputProps?: IInputProps
  containerProps?: IFormControlProps
}

export const FormikInput = ({
  handleBlur,
  handleChange,
  value,
  errors,
  fieldName,
  label,
  placeholder,
  inputProps,
  containerProps,
}: IFormikInputProps) => (
  <FormControl isInvalid={fieldName in errors} {...containerProps}>
    {label && <FormControl.Label testID={'label'}>{label}</FormControl.Label>}
    <Input
      onBlur={handleBlur}
      onChangeText={handleChange}
      value={value}
      placeholder={placeholder}
      testID={'input'}
      {...inputProps}
    />
    <FormControl.ErrorMessage testID={'errorMessage'}>
      {errors[fieldName]}
    </FormControl.ErrorMessage>
  </FormControl>
)
