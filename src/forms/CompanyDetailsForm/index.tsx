import { VStack } from 'native-base'

import { FirebaseInput } from '../../firebaseComponents/FirebaseInput'
import { CompanyDetailsSchema } from './schema'

import {
  COMPANY_ADDRESS_DETAILS,
  COMPANY_CONTACT_DETAILS,
  CompanyDetailsType,
  ICompanyDetailsPayload,
} from '../../types'

interface ICompanyDetailsFormProps {
  onSubmitCompanyDetails: (
    companyDetailsPayload: ICompanyDetailsPayload
  ) => void
  initialValues: CompanyDetailsType
}

export const CompanyDetailsForm = ({
  onSubmitCompanyDetails,
  initialValues,
}: ICompanyDetailsFormProps) => {
  const companyAddressData = [
    { key: COMPANY_ADDRESS_DETAILS.StreetAddress, label: 'Street address' },
    { key: COMPANY_ADDRESS_DETAILS.City, label: 'City' },
    { key: COMPANY_ADDRESS_DETAILS.StateProvince, label: 'State / Province' },
    { key: COMPANY_ADDRESS_DETAILS.Country, label: 'Country' },
    { key: COMPANY_ADDRESS_DETAILS.ZipCode, label: 'Zip code' },
  ]

  const companyContactData = [
    { key: COMPANY_CONTACT_DETAILS.TelephoneNumber, label: 'Telephone number' },
    { key: COMPANY_CONTACT_DETAILS.CellphoneNumber, label: 'Cellphone number' },
    { key: COMPANY_CONTACT_DETAILS.Email, label: 'Email' },
  ]

  return (
    <VStack space={2}>
      <FirebaseInput
        fieldKey="name"
        validationSchema={CompanyDetailsSchema['name']}
        onSubmit={companyDetailsField =>
          onSubmitCompanyDetails({ companyDetailsField })
        }
        label="Company name"
        key="name"
        initialValue={initialValues.name}
      />
      {companyAddressData.map(({ key, label }) => (
        <FirebaseInput
          fieldKey={key}
          validationSchema={CompanyDetailsSchema[key]}
          onSubmit={companyDetailsField =>
            onSubmitCompanyDetails({
              detailSection: 'address',
              companyDetailsField,
            })
          }
          label={label}
          initialValue={initialValues[key]}
          key={key}
        />
      ))}
      {companyContactData.map(({ key, label }) => (
        <FirebaseInput
          fieldKey={key}
          validationSchema={CompanyDetailsSchema[key]}
          onSubmit={companyDetailsField =>
            onSubmitCompanyDetails({
              detailSection: 'contactInfo',
              companyDetailsField,
            })
          }
          label={label}
          initialValue={initialValues[key]}
          key={key}
        />
      ))}
    </VStack>
  )
}
