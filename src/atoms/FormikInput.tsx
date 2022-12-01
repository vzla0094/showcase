import { FormControl, Input } from 'native-base'
import { FormikValues } from 'formik'

interface IFormikProps {
  handleBlur: FormikValues['handleBlur']
  handleChange: FormikValues['handleChange']
  errors: FormikValues['errors']
}

interface IFormikInputProps extends IFormikProps {
  value: Partial<FormikValues>['values']
  fieldName: string
  label?: string
  placeholder?: string
}

export const FormikInput = ({
  handleBlur,
  handleChange,
  value,
  errors,
  fieldName,
  label,
  placeholder,
}: IFormikInputProps) => (
  <FormControl isInvalid={fieldName in errors}>
    {label && <FormControl.Label>{label}</FormControl.Label>}
    <Input
      onBlur={handleBlur(fieldName)}
      onChangeText={handleChange(fieldName)}
      value={value}
      placeholder={placeholder}
    />
    <FormControl.ErrorMessage>{errors.eventName}</FormControl.ErrorMessage>
  </FormControl>
)