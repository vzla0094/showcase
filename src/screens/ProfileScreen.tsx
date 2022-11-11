import { Container, ScrollView } from 'native-base'
import { useAppDispatch, useAppSelector } from '../hooks'
import { actions } from '../redux/slices'
import { UserDetailsForm } from '../forms/UserDetailsForm'
import { CompanyDetailsForm } from '../forms/CompanyDetailsForm'
import { setUserDetail } from '../redux/slices/user'
import { UserDetailType } from '../types'

export const ProfileScreen = () => {
  const dispatch = useAppDispatch()
  const userDetails = useAppSelector(state => state.user.details)
  const company = useAppSelector(state => state.company)

  const handleUserDetailsSubmit = (userDetail: UserDetailType) =>
    dispatch(setUserDetail(userDetail))

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
          onSubmit={({
            name,
            streetAddress,
            city,
            stateProvince,
            country,
            zipCode,
            telephoneNumber,
            cellphoneNumber,
            email,
          }) => {
            dispatch(
              actions.company.setCompany({
                name,
                address: {
                  streetAddress,
                  city,
                  stateProvince,
                  country,
                  zipCode,
                },
                contactInfo: {
                  telephoneNumber,
                  cellphoneNumber,
                  email,
                },
              })
            )
          }}
          initialValues={{
            name: company.name,
            streetAddress: company.address.streetAddress,
            city: company.address.city,
            stateProvince: company.address.stateProvince,
            country: company.address.country,
            zipCode: company.address.zipCode,
            ...company.contactInfo,
          }}
        />
      </Container>
    </ScrollView>
  )
}
