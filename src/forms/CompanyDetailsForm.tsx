import * as Yup from 'yup'
import { Button, FormControl, Heading, Input, VStack } from 'native-base'
import { Formik } from 'formik'
import { ICompany } from '../types'

interface IValues {
  name: ICompany['name']
  streetAddress: ICompany['address']['streetAddress']
  city: ICompany['address']['city']
  stateProvince: ICompany['address']['stateProvince']
  country: ICompany['address']['country']
  zipCode: ICompany['address']['zipCode']
  telephoneNumber: ICompany['contactInfo']['telephoneNumber']
  cellphoneNumber: ICompany['contactInfo']['cellphoneNumber']
  email: ICompany['contactInfo']['email']
}

interface ICompanyDetailsFormProps {
  onSubmit: (data: IValues) => void
  initialValues: IValues
}

export const CompanyDetailsForm = ({
  onSubmit,
  initialValues,
}: ICompanyDetailsFormProps) => (
  <Formik
    initialValues={initialValues}
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
            Boolean(!value) || Boolean(value && value.toString().length === 5)
        )
        .required('Required'),
      telephoneNumber: Yup.number().typeError('Must be a number'),
      cellphoneNumber: Yup.number().typeError('Must be a number'),
      email: Yup.string().email(),
    })}
    onSubmit={onSubmit}
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
          <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
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
          <FormControl.ErrorMessage>{errors.city}</FormControl.ErrorMessage>
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
          <FormControl.ErrorMessage>{errors.country}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={'zipCode' in errors}>
          <Input
            onBlur={handleBlur('zipCode')}
            onChangeText={handleChange('zipCode')}
            value={values.zipCode}
            placeholder="Zip Code"
            size="lg"
          />
          <FormControl.ErrorMessage>{errors.zipCode}</FormControl.ErrorMessage>
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
          <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
        </FormControl>

        <Button onPress={() => handleSubmit()}>Save</Button>
      </VStack>
    )}
  </Formik>
)
