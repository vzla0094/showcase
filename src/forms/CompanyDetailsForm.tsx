import * as yup from 'yup'
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
    validationSchema={yup.object({
      name: yup.string().required('Required'),
      streetAddress: yup.string().required('Required'),
      city: yup.string().required('Required'),
      stateProvince: yup.string().required('Required'),
      country: yup.string().required('Required'),
      zipCode: yup
        .number()
        .typeError('Must be a number')
        .test(
          'length',
          'Must be exactly 5 digits',
          value =>
            Boolean(!value) || Boolean(value && value.toString().length === 5)
        )
        .required('Required'),
      telephoneNumber: yup.number().typeError('Must be a number'),
      cellphoneNumber: yup.number().typeError('Must be a number'),
      email: yup.string().email(),
    })}
    onSubmit={onSubmit}
  >
    {({ handleBlur, handleChange, handleSubmit, values, errors }) => (
      <VStack space={1}>
        <Heading>Company details</Heading>
        <FormControl isRequired isInvalid={'name' in errors}>
          <FormControl.Label>Company name</FormControl.Label>
          <Input
            onBlur={handleBlur('name')}
            onChangeText={handleChange('name')}
            value={values.name}
            placeholder="Company name"
          />
          <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={'streetAddress' in errors}>
          <FormControl.Label>Street address</FormControl.Label>
          <Input
            onBlur={handleBlur('streetAddress')}
            onChangeText={handleChange('streetAddress')}
            value={values.streetAddress}
            placeholder="Street address"
          />
          <FormControl.ErrorMessage>
            {errors.streetAddress}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={'city' in errors}>
          <FormControl.Label>City</FormControl.Label>
          <Input
            onBlur={handleBlur('city')}
            onChangeText={handleChange('city')}
            value={values.city}
            placeholder="City"
          />
          <FormControl.ErrorMessage>{errors.city}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={'stateProvince' in errors}>
          <FormControl.Label>State / Province</FormControl.Label>
          <Input
            onBlur={handleBlur('stateProvince')}
            onChangeText={handleChange('stateProvince')}
            value={values.stateProvince}
            placeholder="State / Province"
          />
          <FormControl.ErrorMessage>
            {errors.stateProvince}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={'country' in errors}>
          <FormControl.Label>Country</FormControl.Label>
          <Input
            onBlur={handleBlur('country')}
            onChangeText={handleChange('country')}
            value={values.country}
            placeholder="Country"
          />
          <FormControl.ErrorMessage>{errors.country}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={'zipCode' in errors}>
          <FormControl.Label>Zip Code</FormControl.Label>
          <Input
            onBlur={handleBlur('zipCode')}
            onChangeText={handleChange('zipCode')}
            value={values.zipCode}
            placeholder="Zip Code"
          />
          <FormControl.ErrorMessage>{errors.zipCode}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={'telephoneNumber' in errors}>
          <FormControl.Label>Telephone number</FormControl.Label>
          <Input
            onBlur={handleBlur('telephoneNumber')}
            onChangeText={handleChange('telephoneNumber')}
            value={values.telephoneNumber}
            placeholder="Telephone number"
          />
          <FormControl.ErrorMessage>
            {errors.telephoneNumber}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={'cellphoneNumber' in errors}>
          <FormControl.Label>Cellphone number</FormControl.Label>
          <Input
            onBlur={handleBlur('cellphoneNumber')}
            onChangeText={handleChange('cellphoneNumber')}
            value={values.cellphoneNumber}
            placeholder="Cellphone number"
          />
          <FormControl.ErrorMessage>
            {errors.cellphoneNumber}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={'email' in errors}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            onBlur={handleBlur('email')}
            onChangeText={handleChange('email')}
            value={values.email}
            placeholder="Email"
          />
          <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
        </FormControl>

        <Button onPress={() => handleSubmit()}>Save</Button>
      </VStack>
    )}
  </Formik>
)
