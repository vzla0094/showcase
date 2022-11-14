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

  const handleCompanyNameSubmit = (companyName: CompanyDetailType['name']) => {
    console.log('handleCompanyNameSubmit: ', companyName)
  }

  const handleCompanyAddressSubmit = (
    companyAddress: Partial<CompanyAddressType>
  ) => {
    console.log('handleCompanyAddressSubmit: ', companyAddress)
  }

  const handleCompanyContactSubmit = (
    companyContactInfo: Partial<CompanyContactInfoType>
  ) => console.log('handleCompanyContactSubmit: ', companyContactInfo)

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
