import { Heading, VStack } from 'native-base'
import {
  COMPANY_ADDRESS_DETAILS,
  COMPANY_CONTACT_DETAILS,
  CompanyAddressType,
  CompanyContactInfoType,
  CompanyDetailsType,
  CompanyDetailType,
} from '../../types'
import { FirebaseUserInput } from '../../components/FirebaseUserInput'
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
  const companyAddressKeys = [
    COMPANY_ADDRESS_DETAILS.streetAddress,
    COMPANY_ADDRESS_DETAILS.city,
    COMPANY_ADDRESS_DETAILS.stateProvince,
    COMPANY_ADDRESS_DETAILS.country,
    COMPANY_ADDRESS_DETAILS.zipCode,
  ]

  const companyAddressLabels = {
    [COMPANY_ADDRESS_DETAILS.streetAddress]: 'Street address',
    [COMPANY_ADDRESS_DETAILS.city]: 'City',
    [COMPANY_ADDRESS_DETAILS.stateProvince]: 'State / Province',
    [COMPANY_ADDRESS_DETAILS.country]: 'Country',
    [COMPANY_ADDRESS_DETAILS.zipCode]: 'Zip code',
  }
  const companyContactKeys = [
    COMPANY_CONTACT_DETAILS.telephoneNumber,
    COMPANY_CONTACT_DETAILS.cellphoneNumber,
    COMPANY_CONTACT_DETAILS.email,
  ]

  const companyContactLabels = {
    [COMPANY_CONTACT_DETAILS.telephoneNumber]: 'Telephone number',
    [COMPANY_CONTACT_DETAILS.cellphoneNumber]: 'Cellphone number',
    [COMPANY_CONTACT_DETAILS.email]: 'Email',
  }

  return (
    <VStack space={2}>
      <Heading>Company details</Heading>
      <FirebaseUserInput
        userDetailKey="name"
        validationSchema={CompanyDetailsSchema['name']}
        onSubmit={onSubmitCompanyName}
        label="Company name"
        key="name"
      />
      {companyAddressKeys.map(companyAddressKey => (
        <FirebaseUserInput
          userDetailKey={companyAddressKey}
          validationSchema={CompanyDetailsSchema[companyAddressKey]}
          onSubmit={onSubmitCompanyAddress}
          label={companyAddressLabels[companyAddressKey]}
          initialValue={initialValues[companyAddressKey]}
          key={companyAddressKey}
        />
      ))}
      {companyContactKeys.map(companyContactKey => (
        <FirebaseUserInput
          userDetailKey={companyContactKey}
          validationSchema={CompanyDetailsSchema[companyContactKey]}
          onSubmit={onSubmitCompanyContact}
          label={companyContactLabels[companyContactKey]}
          initialValue={initialValues[companyContactKey]}
          key={companyContactKey}
        />
      ))}
    </VStack>
  )
}
