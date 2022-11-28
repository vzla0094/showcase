import { setCompanyDetails } from '../redux/slices/company'
import { useAppDispatch, useAppSelector } from '../hooks'

import { CompanyDetailsForm } from '../forms/CompanyDetailsForm'
import { ViewContainer } from '../atoms/ViewContainer'

import { ICompanyDetailsPayload } from '../types'

export const CompanyDetailsScreen = () => {
  const dispatch = useAppDispatch()
  const companyDetails = useAppSelector(({ company }) => ({
    name: company.name,
    streetAddress: company.address.streetAddress,
    city: company.address.city,
    stateProvince: company.address.stateProvince,
    country: company.address.country,
    zipCode: company.address.zipCode,
    ...company.contactInfo,
  }))

  const handleCompanyDetailsSubmit = (
    companyDetailsPayload: ICompanyDetailsPayload
  ) => dispatch(setCompanyDetails(companyDetailsPayload))

  return (
    <ViewContainer alignment="stretch" scroll>
      <CompanyDetailsForm
        onSubmitCompanyDetails={handleCompanyDetailsSubmit}
        initialValues={companyDetails}
      />
    </ViewContainer>
  )
}
