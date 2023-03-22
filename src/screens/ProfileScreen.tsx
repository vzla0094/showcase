import { useEffect, useRef } from 'react'
import { Box, Button, IconButton, Text, useTheme } from 'native-base'
import { FormikProps } from 'formik'
import { CaretLeft, PencilSimple } from 'phosphor-react-native'

import { EditableProfileView } from '../views/EditableProfileView'
import { UserDetailsForm } from '../forms/UserDetailsForm'
import { ViewContainer } from '../atoms/ViewContainer'

import { editUser } from '../redux/slices/user'
import { useAppDispatch, useAppSelector } from '../hooks'

import {
  AuthBottomTabScreenProps,
  EditUserDetailsSubmitType,
  IUser,
} from '../types'
import { createCompany } from '../redux/slices/company'

export const ProfileScreen = ({
  navigation,
  route,
}: AuthBottomTabScreenProps<'Profile'>) => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const { edit } = route.params
  const formikRef = useRef<FormikProps<IUser['details']>>(null)

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
            onPress={() => formikRef.current?.handleSubmit()}
            icon={<CaretLeft color={colors.lightText} size={24} />}
          />
        ),
    })
  }, [navigation, edit])

  const user = useAppSelector(state => state.user)
  const { uid, details: userDetails } = user

  const companyId = useAppSelector(({ company }) => company.companyId)

  const handleSubmit: EditUserDetailsSubmitType = async userDetails => {
    await dispatch(editUser(userDetails))
    navigation.setParams({ edit: false })
  }

  const handleAddCompany = async () => {
    await dispatch(createCompany(uid))
    navigation.navigate('CompanyStack', {
      screen: 'CompanyDetails',
    })
  }

  return (
    <Box flex={1} justifyContent="space-between">
      <EditableProfileView editable={edit} userDetails={userDetails}>
        <UserDetailsForm
          onSubmit={handleSubmit}
          ref={formikRef}
          initialValues={userDetails}
        />
      </EditableProfileView>
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
