import { useState } from 'react'
import { FormControl, Pressable, Text } from 'native-base'
import { FormikValues } from 'formik'
import { Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

interface IFormikProps {
  handleChange: (value: string) => void
  errors: FormikValues['errors']
}

interface IInputDateProps extends IFormikProps {
  value: Partial<FormikValues>['values']
  fieldName: string
  label?: string
}

export const FormikInputDate = ({
  handleChange,
  value,
  errors,
  fieldName,
  label,
}: IInputDateProps) => {
  // Due to the difference between Android and iOS native date pickers, we need platform specific logic.
  // Android's native Date Picker always shows up in a modal, so we need to use a Pressable to hide/show it. And a date view to show the selected date.
  // iOS's native Date Picker shows up inline, so we don't need to hide/show it imperatively.
  const [show, setShow] = useState(Platform.OS === 'ios')

  return (
    <FormControl isInvalid={fieldName in errors}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      {Platform.OS === 'android' && (
        <Pressable
          bg="white"
          shadow={1}
          rounded="sm"
          p={3}
          onPress={() => setShow(true)}
        >
          <Text>
            {value
              ? new Date(value).toLocaleDateString()
              : 'Select a start date'}
          </Text>
        </Pressable>
      )}
      {show && (
        <DateTimePicker
          style={{ width: 140 }} // DateTimePicker v6.3.4 fixes width bug, need to update Expo SDK to get it
          value={value ? new Date(value) : new Date()}
          onChange={(event, selectedDate) => {
            setShow(Platform.OS === 'ios')

            if (selectedDate) {
              handleChange(selectedDate.toISOString())
            }
          }}
        />
      )}
      <FormControl.ErrorMessage>{errors[fieldName]}</FormControl.ErrorMessage>
    </FormControl>
  )
}
