import { Heading, VStack } from 'native-base'
import {
  COMPANY_ADDRESS_DETAILS,
  COMPANY_CONTACT_DETAILS,
  CompanyAddressType,
  CompanyContactInfoType,
  CompanyDetailsType,
  CompanyDetailType,
} from '../../types'
import { FirebaseInput } from '../../components'
import { CompanyDetailsSchema } from './schema'

interface ICompanyDetailsFormProps {
  onSubmitCompanyName: (companyName: CompanyDetailType['name']) => void
  onSubmitCompanyAddress: (companyAddress: Partial<CompanyAddressType>) => void
  onSubmitCompanyContact: (
    companyContactInfo: Partial<CompanyContactInfoType>
  ) => void
  initialValues: CompanyDetailsType
}

export const CompanyDetailsForm = ({
  onSubmitCompanyName,
  onSubmitCompanyAddress,
  onSubmitCompanyContact,
  initialValues,
}: ICompanyDetailsFormProps) => {
  const companyAddressData = [
    { key: COMPANY_ADDRESS_DETAILS.streetAddress, label: 'Street address' },
    { key: COMPANY_ADDRESS_DETAILS.city, label: 'City' },
    { key: COMPANY_ADDRESS_DETAILS.stateProvince, label: 'State / Province' },
    { key: COMPANY_ADDRESS_DETAILS.country, label: 'Country' },
    { key: COMPANY_ADDRESS_DETAILS.zipCode, label: 'Zip code' },
  ]

  const companyContactData = [
    { key: COMPANY_CONTACT_DETAILS.telephoneNumber, label: 'Telephone number' },
    { key: COMPANY_CONTACT_DETAILS.cellphoneNumber, label: 'Cellphone number' },
    { key: COMPANY_CONTACT_DETAILS.email, label: 'Email' },
  ]

  return (
    <VStack space={2}>
      <Heading>Company details</Heading>
      <FirebaseInput
        fieldKey="name"
        validationSchema={CompanyDetailsSchema['name']}
        onSubmit={onSubmitCompanyName}
        label="Company name"
        key="name"
      />
      {companyAddressData.map(({ key, label }) => (
        <FirebaseInput
          fieldKey={key}
          validationSchema={CompanyDetailsSchema[key]}
          onSubmit={onSubmitCompanyAddress}
          label={label}
          initialValue={initialValues[key]}
          key={key}
        />
      ))}
      {companyContactData.map(({ key, label }) => (
        <FirebaseInput
          fieldKey={key}
          validationSchema={CompanyDetailsSchema[key]}
          onSubmit={onSubmitCompanyContact}
          label={label}
          initialValue={initialValues[key]}
          key={key}
        />
      ))}
    </VStack>
  )
}
