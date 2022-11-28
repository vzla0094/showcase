import { VStack } from 'native-base'

import { FirebaseInput } from '../../firebaseComponents/FirebaseInput'
import { CompanyDetailsSchema } from './schema'

import {
  COMPANY_DETAILS,
  CompanyDetailsType,
  ICompanyDetailsField,
} from '../../types'

interface ICompanyDetailsFormProps {
  onSubmit: (companyDetailsField: ICompanyDetailsField) => void
  initialValues: CompanyDetailsType
}

export const CompanyDetailsForm = ({
  onSubmit,
  initialValues,
}: ICompanyDetailsFormProps) => {
  const companyDetailsData = [
    { key: COMPANY_DETAILS.Name, label: 'Company name' },
    { key: COMPANY_DETAILS.StreetAddress, label: 'Street address' },
    { key: COMPANY_DETAILS.City, label: 'City' },
    { key: COMPANY_DETAILS.StateProvince, label: 'State / Province' },
    { key: COMPANY_DETAILS.Country, label: 'Country' },
    { key: COMPANY_DETAILS.ZipCode, label: 'Zip code' },
    { key: COMPANY_DETAILS.TelephoneNumber, label: 'Telephone number' },
    { key: COMPANY_DETAILS.CellphoneNumber, label: 'Cellphone number' },
    { key: COMPANY_DETAILS.Email, label: 'Email' },
  ]

  return (
    <VStack space={2}>
      {companyDetailsData.map(({ key, label }) => (
        <FirebaseInput
          fieldKey={key}
          validationSchema={CompanyDetailsSchema[key]}
          onSubmit={onSubmit}
          label={label}
          initialValue={initialValues[key]}
          key={key}
        />
      ))}
    </VStack>
  )
}
