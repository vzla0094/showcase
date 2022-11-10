import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
} from 'native-base'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../hooks'
import { actions } from '../redux/slices'

export const ProfileScreen = () => {
  const dispatch = useAppDispatch()
  return (
    <Container centerContent safeArea flex={1} alignSelf="center" width="100%">
      <Formik
        initialValues={{
          username: '',
          birthDay: '',
          birthMonth: '',
          birthYear: '',
          phoneNumber: '',
        }}
        validationSchema={Yup.object({
          username: Yup.string(),
          birthDay: Yup.number()
            .typeError('Must be a number')
            .min(1, 'Must be between 1 and 31')
            .max(31, 'Must be between 1 and 31'),
          birthMonth: Yup.number()
            .typeError('Must be a number')
            .min(1, 'Must be between 1 and 12')
            .max(12, 'Must be between 1 and 12'),
          birthYear: Yup.number()
            .typeError('Must be a number')
            .test(
              'length',
              'Must be exactly 4 characters',
              value =>
                Boolean(!value) ||
                Boolean(value && value.toString().length === 4)
            ),
          phoneNumber: Yup.number().typeError('Must be a number'),
        })}
        onSubmit={data => {
          dispatch(actions.user.setUserDetails(data))
        }}
      >
        {({ handleBlur, handleChange, handleSubmit, values, errors }) => (
          <VStack width="100%" space={2}>
            <Heading>User details</Heading>
            <FormControl isRequired isInvalid={'username' in errors}>
              <Input
                onBlur={handleBlur('username')}
                onChangeText={handleChange('username')}
                value={values.username}
                placeholder="Display name"
                size="lg"
              />
              <FormControl.ErrorMessage>
                {errors.username}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={'birthDay' in errors}>
              <Input
                onBlur={handleBlur('birthDay')}
                onChangeText={handleChange('birthDay')}
                value={values.birthDay}
                placeholder="Day of birth"
                size="lg"
              />
              <FormControl.ErrorMessage>
                {errors.birthDay}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={'birthMonth' in errors}>
              <Input
                onBlur={handleBlur('birthMonth')}
                onChangeText={handleChange('birthMonth')}
                value={values.birthMonth}
                placeholder="Month of birth"
                size="lg"
              />
              <FormControl.ErrorMessage>
                {errors.birthMonth}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={'birthYear' in errors}>
              <Input
                onBlur={handleBlur('birthYear')}
                onChangeText={handleChange('birthYear')}
                value={values.birthYear}
                placeholder="Year of birth"
                size="lg"
              />
              <FormControl.ErrorMessage>
                {errors.birthYear}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={'phoneNumber' in errors}>
              <Input
                onBlur={handleBlur('phoneNumber')}
                onChangeText={handleChange('phoneNumber')}
                value={values.phoneNumber}
                placeholder="Phone number"
                size="lg"
              />
              <FormControl.ErrorMessage>
                {errors.phoneNumber}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button onPress={() => handleSubmit()}>Save</Button>
          </VStack>
        )}
      </Formik>
    </Container>
  )
}
