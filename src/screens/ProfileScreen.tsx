import { Container, ScrollView } from 'native-base'
import { useAppDispatch, useAppSelector } from '../hooks'
import { UserDetailsForm } from '../forms/UserDetailsForm'
import { CompanyDetailsForm } from '../forms/CompanyDetailsForm'
import { setUserDetail } from '../redux/slices/user'
import {
  ICompanyAddressField,
  ICompanyContactField,
  ICompanyNameField,
  IUserField,
} from '../types'
import {
  setCompanyAddress,
  setCompanyContactInfo,
  setCompanyName,
} from '../redux/slices/company'

export const ProfileScreen = () => {
  const dispatch = useAppDispatch()
  const userDetails = useAppSelector(state => state.user.details)
  const companyDetails = useAppSelector(({ company }) => ({
    name: company.name,
    streetAddress: company.address.streetAddress,
    city: company.address.city,
    stateProvince: company.address.stateProvince,
    country: company.address.country,
    zipCode: company.address.zipCode,
    ...company.contactInfo,
  }))

  const handleUserDetailsSubmit = (userField: IUserField) =>
    dispatch(setUserDetail(userField))

  const handleCompanyNameSubmit = (companyField: ICompanyNameField) =>
    dispatch(setCompanyName(companyField))

  const handleCompanyAddressSubmit = (companyAddress: ICompanyAddressField) =>
    dispatch(setCompanyAddress(companyAddress))

  const handleCompanyContactSubmit = (
    companyContactInfo: ICompanyContactField
  ) => dispatch(setCompanyContactInfo(companyContactInfo))

  return (
    <ScrollView>
      <Container
        safeArea
        centerContent
        flex={1}
        alignSelf="center"
        alignItems="stretch"
        width="100%"
      >
        <UserDetailsForm
          onSubmit={handleUserDetailsSubmit}
          initialValues={userDetails}
        />
        <CompanyDetailsForm
          onSubmitCompanyName={handleCompanyNameSubmit}
          onSubmitCompanyAddress={handleCompanyAddressSubmit}
          onSubmitCompanyContact={handleCompanyContactSubmit}
          initialValues={companyDetails}
        />
      </Container>
    </ScrollView>
  )
}
