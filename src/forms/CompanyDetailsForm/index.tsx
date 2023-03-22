import React from 'react'
import { Button, VStack } from 'native-base'

import { Formik, FormikProps } from 'formik'
import { CompanyDetailsSchema } from './schema'

import { FormikInput } from '../../atoms/FormikInput'

import {
  COMPANY_DETAILS,
  CompanyDetailsType,
  EditCompanySubmitType,
} from '../../types'

interface ICompanyDetailsFormProps {
  onSubmit: EditCompanySubmitType
  initialValues: CompanyDetailsType
}

export const CompanyDetailsForm = React.forwardRef<
  FormikProps<CompanyDetailsType>,
  ICompanyDetailsFormProps
>(({ onSubmit, initialValues }, formikRef) => (
  <Formik
    innerRef={formikRef}
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={CompanyDetailsSchema}
  >
    {({ values, handleChange, handleBlur, errors, handleSubmit }) => (
      <VStack
        space={2}
        alignItems="stretch"
        flex={1}
        justifyContent="flex-start"
      >
        <FormikInput
          value={values.name}
          fieldName={COMPANY_DETAILS.Name}
          handleBlur={handleBlur(COMPANY_DETAILS.Name)}
          handleChange={handleChange(COMPANY_DETAILS.Name)}
          errors={errors}
          label="Company name"
        />
        <FormikInput
          value={values.streetAddress}
          fieldName={COMPANY_DETAILS.StreetAddress}
          handleBlur={handleBlur(COMPANY_DETAILS.StreetAddress)}
          handleChange={handleChange(COMPANY_DETAILS.StreetAddress)}
          errors={errors}
          label="Street address"
        />
        <FormikInput
          value={values.city}
          fieldName={COMPANY_DETAILS.City}
          handleBlur={handleBlur(COMPANY_DETAILS.City)}
          handleChange={handleChange(COMPANY_DETAILS.City)}
          errors={errors}
          label="City"
        />
        <FormikInput
          value={values.stateProvince}
          fieldName={COMPANY_DETAILS.StateProvince}
          handleBlur={handleBlur(COMPANY_DETAILS.StateProvince)}
          handleChange={handleChange(COMPANY_DETAILS.StateProvince)}
          errors={errors}
          label="State / Province"
        />
        <FormikInput
          value={values.country}
          fieldName={COMPANY_DETAILS.Country}
          handleBlur={handleBlur(COMPANY_DETAILS.Country)}
          handleChange={handleChange(COMPANY_DETAILS.Country)}
          errors={errors}
          label="Country"
        />
        <FormikInput
          value={values.zipCode}
          fieldName={COMPANY_DETAILS.ZipCode}
          handleBlur={handleBlur(COMPANY_DETAILS.ZipCode)}
          handleChange={handleChange(COMPANY_DETAILS.ZipCode)}
          errors={errors}
          label="Zip code"
        />
        <FormikInput
          value={values.telephoneNumber}
          fieldName={COMPANY_DETAILS.TelephoneNumber}
          handleBlur={handleBlur(COMPANY_DETAILS.TelephoneNumber)}
          handleChange={handleChange(COMPANY_DETAILS.TelephoneNumber)}
          errors={errors}
          label="Telephone number"
        />
        <FormikInput
          value={values.cellphoneNumber}
          fieldName={COMPANY_DETAILS.CellphoneNumber}
          handleBlur={handleBlur(COMPANY_DETAILS.CellphoneNumber)}
          handleChange={handleChange(COMPANY_DETAILS.CellphoneNumber)}
          errors={errors}
          label="Cellphone number"
        />
        <FormikInput
          value={values.email}
          fieldName={COMPANY_DETAILS.Email}
          handleBlur={handleBlur(COMPANY_DETAILS.Email)}
          handleChange={handleChange(COMPANY_DETAILS.Email)}
          errors={errors}
          label="Email"
        />

        <Button onPress={() => handleSubmit()}>Save Company</Button>
      </VStack>
    )}
  </Formik>
))

CompanyDetailsForm.displayName = 'CompanyDetailsForm'
