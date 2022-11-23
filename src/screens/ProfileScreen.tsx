import { useAppDispatch, useAppSelector } from '../hooks'
import { UserDetailsForm } from '../forms/UserDetailsForm'
import { CompanyDetailsForm } from '../forms/CompanyDetailsForm'
import { setUserDetail } from '../redux/slices/user'
import { ICompanyDetailsPayload, IUserDetailsField } from '../types'
import { setCompanyDetails } from '../redux/slices/company'
import { ViewContainer } from '../atoms/ViewContainer'

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

  const handleUserDetailsSubmit = (userDetailsField: IUserDetailsField) =>
    dispatch(setUserDetail(userDetailsField))

  const handleCompanyDetailsSubmit = (
    companyDetailsPayload: ICompanyDetailsPayload
  ) => dispatch(setCompanyDetails(companyDetailsPayload))

  return (
    <ViewContainer alignment="stretch" scroll>
      <UserDetailsForm
        onSubmit={handleUserDetailsSubmit}
        initialValues={userDetails}
      />
      <CompanyDetailsForm
        onSubmitCompanyDetails={handleCompanyDetailsSubmit}
        initialValues={companyDetails}
      />
    </ViewContainer>
  )
}
