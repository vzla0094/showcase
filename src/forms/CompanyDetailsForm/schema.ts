import * as yup from 'yup'
import { COMPANY_ADDRESS_DETAILS, COMPANY_CONTACT_DETAILS } from '../../types'

type CompanyAddressSchemaType = {
  [key in COMPANY_ADDRESS_DETAILS]: yup.AnySchema
}

type CompanyContactSchemaType = {
  [key in COMPANY_CONTACT_DETAILS]: yup.AnySchema
}

type CompanyDetailsSchemaType = {
  name: yup.AnySchema
} & CompanyAddressSchemaType &
  CompanyContactSchemaType

export const CompanyDetailsSchema: CompanyDetailsSchemaType = {
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
    ),
  telephoneNumber: yup.number().typeError('Must be a number'),
  cellphoneNumber: yup.number().typeError('Must be a number'),
  email: yup.string().email(),
}
