import { setCompany } from '../redux/slices/company'
import { useAppDispatch, useAppSelector } from '../hooks'

import { CompanyDetailsForm } from '../forms/CompanyDetailsForm'
import { ViewContainer } from '../atoms/ViewContainer'

import { ICompanyDetailsField } from '../types'

export const CompanyDetailsScreen = () => {
  const dispatch = useAppDispatch()
  const companyDetails = useAppSelector(
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

  const handleSubmit = ({ fieldKey, value }: ICompanyDetailsField) =>
    dispatch(setCompany({ [fieldKey]: value }))

  return (
    <ViewContainer alignment="stretch" scroll>
      <CompanyDetailsForm
        onSubmit={handleSubmit}
        initialValues={companyDetails}
      />
    </ViewContainer>
  )
}
