import { Container, ScrollView } from 'native-base'
import { useAppDispatch, useAppSelector } from '../hooks'
import { UserDetailsForm } from '../forms/UserDetailsForm'
import { CompanyDetailsForm } from '../forms/CompanyDetailsForm'
import { setUserDetail } from '../redux/slices/user'
import {
  CompanyAddressType,
  CompanyContactInfoType,
  CompanyDetailType,
  UserDetailType,
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

  const handleUserDetailsSubmit = (userDetail: UserDetailType) =>
    dispatch(setUserDetail(userDetail))

  const handleCompanyNameSubmit = (name: CompanyDetailType['name']) =>
    dispatch(setCompanyName(name))

  const handleCompanyAddressSubmit = (
    companyAddress: Partial<CompanyAddressType>
  ) => dispatch(setCompanyAddress(companyAddress))

  const handleCompanyContactSubmit = (
    companyContactInfo: Partial<CompanyContactInfoType>
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
