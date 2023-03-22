import { useEffect, useRef } from 'react'
import { FormikProps } from 'formik'
import { IconButton, useTheme } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'

import { useAppDispatch, useAppSelector } from '../hooks'

import { CompanyDetailsForm } from '../forms/CompanyDetailsForm'
import { ViewContainer } from '../atoms/ViewContainer'
import {
  CompanyDetailsType,
  CompanyStackScreenProps,
  EditCompanySubmitType,
} from '../types'
import { setCompany } from '../redux/slices/company'

export const CompanyDetailsScreen = ({
  navigation,
}: CompanyStackScreenProps<'CompanyDetails'>) => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const formikRef = useRef<FormikProps<CompanyDetailsType>>(null)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          onPress={() => formikRef.current?.handleSubmit()}
          icon={<CaretLeft color={colors.lightText} size={24} />}
        />
      ),
    })
  }, [])

  const companyDetails: CompanyDetailsType = useAppSelector(
    ({
      company: {
        name,
        streetAddress,
        city,
        stateProvince,
        country,
        zipCode,
        telephoneNumber,
        cellphoneNumber,
        email,
      },
    }) => ({
      name,
      streetAddress,
      city,
      stateProvince,
      country,
      zipCode,
      telephoneNumber,
      cellphoneNumber,
      email,
    })
  )

  const handleSubmit: EditCompanySubmitType = async newCompanyDetails => {
    await dispatch(setCompany(newCompanyDetails))
    navigation.reset({
      index: 0,
      routes: [{ name: 'CompanyDashboard' }],
    })
  }

  return (
    <ViewContainer alignItems="stretch" scroll>
      <CompanyDetailsForm
        ref={formikRef}
        onSubmit={handleSubmit}
        initialValues={companyDetails}
      />
    </ViewContainer>
  )
}
