import { Container, ScrollView } from 'native-base'
import { useAppDispatch, useAppSelector } from '../hooks'
import { actions } from '../redux/slices'
import { UserDetailsForm } from '../forms/UserDetailsForm'
import { CompanyDetailsForm } from '../forms/CompanyDetailsForm'

export const ProfileScreen = () => {
  const dispatch = useAppDispatch()
  const userDetails = useAppSelector(state => state.user.details)
  const company = useAppSelector(state => state.company)

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
          onSubmit={data => dispatch(actions.user.setUserDetails(data))}
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
