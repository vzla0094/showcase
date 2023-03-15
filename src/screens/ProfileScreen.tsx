import { useEffect } from 'react'
import { Box, Button, IconButton, Text, useTheme } from 'native-base'
import { CaretLeft, PencilSimple } from 'phosphor-react-native'

import { ProfileView } from '../views/ProfileView'
import { ViewContainer } from '../atoms/ViewContainer'

import { setUserDetail } from '../redux/slices/user'
import { createCompany } from '../redux/slices/company'
import { useAppDispatch, useAppSelector } from '../hooks'

import { AuthBottomTabScreenProps, IUserDetailsField } from '../types'

export const ProfileScreen = ({
  navigation,
  route,
}: AuthBottomTabScreenProps<'Profile'>) => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const { edit } = route.params

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        !edit && (
          <IconButton
            mr={2}
            onPress={() => navigation.setParams({ edit: true })}
            icon={<PencilSimple color={colors.lightText} size={24} />}
          />
        ),
      headerLeft: () =>
        edit && (
          <IconButton
            ml={2}
            onPress={() => navigation.setParams({ edit: false })}
            icon={<CaretLeft color={colors.lightText} size={24} />}
          />
        ),
    })
  }, [navigation, edit])

  const user = useAppSelector(state => state.user)
  const { uid, details: userDetails } = user

  const companyId = useAppSelector(({ company }) => company.companyId)

  const handleUserDetailsSubmit = (userDetailsField: IUserDetailsField) =>
    dispatch(setUserDetail(userDetailsField))

  const handleAddCompany = async () => {
    await dispatch(createCompany(uid))
    navigation.navigate('CompanyStack', {
      screen: 'CompanyDetails',
    })
  }

  return (
    <Box flex={1} justifyContent="space-between">
      <ProfileView
        edit={edit}
        onSubmit={handleUserDetailsSubmit}
        userDetails={userDetails}
      />
      {!companyId && (
        <ViewContainer flex={0} alignItems="stretch" title="Company">
          <Text mb={4}>
            Do you want to promote your own events? Create a company profile to
            create events and sell your tickets!
          </Text>
          <Button onPress={handleAddCompany}>Add company</Button>
        </ViewContainer>
      )}
    </Box>
  )
}
