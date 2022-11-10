import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  ScrollView,
  VStack,
} from 'native-base'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../hooks'
import { actions } from '../redux/slices'

export const ProfileScreen = () => {
  const dispatch = useAppDispatch()
  return (
    <ScrollView>
      <Container
        centerContent
        safeArea
        flex={1}
        alignSelf="center"
        width="100%"
      >
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
                'Must be exactly 4 digits',
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
        <Formik
          initialValues={{
            name: '',
            streetAddress: '',
            city: '',
            stateProvince: '',
            country: '',
            zipCode: '',
            telephoneNumber: '',
            cellphoneNumber: '',
            email: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            streetAddress: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            stateProvince: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
            zipCode: Yup.number()
              .typeError('Must be a number')
              .test(
                'length',
                'Must be exactly 5 digits',
                value =>
                  Boolean(!value) ||
                  Boolean(value && value.toString().length === 5)
              )
              .required('Required'),
            telephoneNumber: Yup.number().typeError('Must be a number'),
            cellphoneNumber: Yup.number().typeError('Must be a number'),
            email: Yup.string().email(),
          })}
          onSubmit={({
            name,
            streetAddress,
            city,
            stateProvince,
            country,
            zipCode,
            telephoneNumber,
            cellphoneNumber,
            email,
          }) => {
            dispatch(
              actions.company.setCompany({
                name,
                address: {
                  streetAddress,
                  city,
                  stateProvince,
                  country,
                  zipCode,
                },
                contactInfo: {
                  telephoneNumber,
                  cellphoneNumber,
                  email,
                },
              })
            )
          }}
        >
          {({ handleBlur, handleChange, handleSubmit, values, errors }) => (
            <VStack width="100%" space={2}>
              <Heading>Company details</Heading>
              <FormControl isRequired isInvalid={'name' in errors}>
                <Input
                  onBlur={handleBlur('name')}
                  onChangeText={handleChange('name')}
                  value={values.name}
                  placeholder="Company name"
                  size="lg"
                />
                <FormControl.ErrorMessage>
                  {errors.name}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={'streetAddress' in errors}>
                <Input
                  onBlur={handleBlur('streetAddress')}
                  onChangeText={handleChange('streetAddress')}
                  value={values.streetAddress}
                  placeholder="Street address"
                  size="lg"
                />
                <FormControl.ErrorMessage>
                  {errors.streetAddress}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={'city' in errors}>
                <Input
                  onBlur={handleBlur('city')}
                  onChangeText={handleChange('city')}
                  value={values.city}
                  placeholder="City"
                  size="lg"
                />
                <FormControl.ErrorMessage>
                  {errors.city}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={'stateProvince' in errors}>
                <Input
                  onBlur={handleBlur('stateProvince')}
                  onChangeText={handleChange('stateProvince')}
                  value={values.stateProvince}
                  placeholder="State / Province"
                  size="lg"
                />
                <FormControl.ErrorMessage>
                  {errors.stateProvince}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={'country' in errors}>
                <Input
                  onBlur={handleBlur('country')}
                  onChangeText={handleChange('country')}
                  value={values.country}
                  placeholder="Country"
                  size="lg"
                />
                <FormControl.ErrorMessage>
                  {errors.country}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={'zipCode' in errors}>
                <Input
                  onBlur={handleBlur('zipCode')}
                  onChangeText={handleChange('zipCode')}
                  value={values.zipCode}
                  placeholder="Zip Code"
                  size="lg"
                />
                <FormControl.ErrorMessage>
                  {errors.zipCode}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={'telephoneNumber' in errors}>
                <Input
                  onBlur={handleBlur('telephoneNumber')}
                  onChangeText={handleChange('telephoneNumber')}
                  value={values.telephoneNumber}
                  placeholder="Telephone number"
                  size="lg"
                />
                <FormControl.ErrorMessage>
                  {errors.telephoneNumber}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={'cellphoneNumber' in errors}>
                <Input
                  onBlur={handleBlur('cellphoneNumber')}
                  onChangeText={handleChange('cellphoneNumber')}
                  value={values.cellphoneNumber}
                  placeholder="Cellphone number"
                  size="lg"
                />
                <FormControl.ErrorMessage>
                  {errors.cellphoneNumber}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={'email' in errors}>
                <Input
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  placeholder="Email"
                  size="lg"
                />
                <FormControl.ErrorMessage>
                  {errors.email}
                </FormControl.ErrorMessage>
              </FormControl>

              <Button onPress={() => handleSubmit()}>Save</Button>
            </VStack>
          )}
        </Formik>
      </Container>
    </ScrollView>
  )
}
