import { Heading, VStack } from 'native-base'
import {
  COMPANY_ADDRESS_DETAILS,
  COMPANY_CONTACT_DETAILS,
  CompanyDetailsType,
  ICompanyAddressField,
  ICompanyContactField,
  ICompanyNameField,
} from '../../types'
import { FirebaseInput } from '../../firebaseComponents/FirebaseInput'
import { CompanyDetailsSchema } from './schema'

interface ICompanyDetailsFormProps {
  onSubmitCompanyName: (name: ICompanyNameField) => void
  onSubmitCompanyAddress: (companyAddressField: ICompanyAddressField) => void
  onSubmitCompanyContact: (companyContactField: ICompanyContactField) => void
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
        initialValue={initialValues.name}
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