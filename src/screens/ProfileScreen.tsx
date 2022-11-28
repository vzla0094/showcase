import { Button } from 'native-base'

import { ViewContainer } from '../atoms/ViewContainer'
import { UserDetailsForm } from '../forms/UserDetailsForm'

import { setUserDetail } from '../redux/slices/user'
import { createCompany } from '../redux/slices/company'
import { useAppDispatch, useAppSelector } from '../hooks'

import { AuthBottomTabScreenProps, IUserDetailsField } from '../types'

export const ProfileScreen = ({
  navigation,
}: AuthBottomTabScreenProps<'Profile'>) => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.user)
  const { uid, details: userDetails } = user

  const companyId = useAppSelector(({ company }) => company.companyId)

  const handleUserDetailsSubmit = (userDetailsField: IUserDetailsField) =>
    dispatch(setUserDetail(userDetailsField))

  const handleAddCompany = async () => {
    await dispatch(createCompany(uid))
    navigation.navigate('Company', {
      screen: 'CompanyDetails',
    })
  }

  return (
    <ViewContainer alignment="stretch">
      <UserDetailsForm
        onSubmit={handleUserDetailsSubmit}
        initialValues={userDetails}
      />
      {!companyId && (
        <Button mt={10} onPress={handleAddCompany}>
          Add company
        </Button>
      )}
    </ViewContainer>
  )
}
