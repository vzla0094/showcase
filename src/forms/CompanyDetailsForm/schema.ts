import * as yup from 'yup'
import { COMPANY_DETAILS } from '../../types'

type CompanyDetailsSchemaType = {
  [key in COMPANY_DETAILS]: yup.AnySchema
}

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
    )
    .required('Required'),
  telephoneNumber: yup.number().typeError('Must be a number'),
  cellphoneNumber: yup.number().typeError('Must be a number'),
  email: yup.string().email(),
}
