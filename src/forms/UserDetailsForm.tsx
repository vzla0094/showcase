import * as yup from 'yup'
import { Button, FormControl, Heading, Input, VStack } from 'native-base'
import { Formik } from 'formik'
import { IUser } from '../types'

interface IUserDetailsFormProps {
  onSubmit: (data: IUser['details']) => void
  initialValues: IUser['details']
}

export const UserDetailsForm = ({
  onSubmit,
  initialValues,
}: IUserDetailsFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yup.object({
        username: yup.string(),
        birthDay: yup
          .number()
          .typeError('Must be a number')
          .min(1, 'Must be between 1 and 31')
          .max(31, 'Must be between 1 and 31'),
        birthMonth: yup
          .number()
          .typeError('Must be a number')
          .min(1, 'Must be between 1 and 12')
          .max(12, 'Must be between 1 and 12'),
        birthYear: yup
          .number()
          .typeError('Must be a number')
          .test(
            'length',
            'Must be exactly 4 digits',
            value =>
              Boolean(!value) || Boolean(value && value.toString().length === 4)
          ),
        phoneNumber: yup.number().typeError('Must be a number'),
      })}
      onSubmit={onSubmit}
    >
      {({ handleBlur, handleChange, handleSubmit, values, errors }) => (
        <VStack width="100%" space={2}>
          <Heading>User details</Heading>
          <FormControl isInvalid={'username' in errors}>
            <FormControl.Label>Display name</FormControl.Label>
            <Input
              onBlur={handleBlur('username')}
              onChangeText={handleChange('username')}
              value={values.username}
              placeholder="Display name"
            />
            <FormControl.ErrorMessage>
              {errors.username}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={'birthDay' in errors}>
            <FormControl.Label>Day of birth</FormControl.Label>
            <Input
              onBlur={handleBlur('birthDay')}
              onChangeText={handleChange('birthDay')}
              value={values.birthDay}
              placeholder="Day of birth"
            />
            <FormControl.ErrorMessage>
              {errors.birthDay}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={'birthMonth' in errors}>
            <FormControl.Label>Month of birth</FormControl.Label>
            <Input
              onBlur={handleBlur('birthMonth')}
              onChangeText={handleChange('birthMonth')}
              value={values.birthMonth}
              placeholder="Month of birth"
            />
            <FormControl.ErrorMessage>
              {errors.birthMonth}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={'birthYear' in errors}>
            <FormControl.Label>Year of birth</FormControl.Label>
            <Input
              onBlur={handleBlur('birthYear')}
              onChangeText={handleChange('birthYear')}
              value={values.birthYear}
              placeholder="Year of birth"
            />
            <FormControl.ErrorMessage>
              {errors.birthYear}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={'phoneNumber' in errors}>
            <FormControl.Label>Phone number</FormControl.Label>
            <Input
              onBlur={handleBlur('phoneNumber')}
              onChangeText={handleChange('phoneNumber')}
              value={values.phoneNumber}
              placeholder="Phone number"
            />
            <FormControl.ErrorMessage>
              {errors.phoneNumber}
            </FormControl.ErrorMessage>
          </FormControl>

          <Button onPress={() => handleSubmit()}>Save</Button>
        </VStack>
      )}
    </Formik>
  )
}
