import React from 'react'
import { Formik, FormikProps } from 'formik'
import { VStack } from 'native-base'

import { UserDetailsSchema } from './schema'

import { FormikInput } from '../../atoms/FormikInput'
import { FormikInputDate } from '../../molecules/FormikInputDate'

import {
  EditUserDetailsSubmitType,
  IUser,
  USER_DETAILS,
  UserDetailsType,
} from '../../types'

interface IUserDetailsFormProps {
  onSubmit: EditUserDetailsSubmitType
  initialValues: UserDetailsType
}

export const UserDetailsForm = React.forwardRef<
  FormikProps<IUser['details']>,
  IUserDetailsFormProps
>(({ onSubmit, initialValues }, formikRef) => (
  <Formik
    innerRef={formikRef}
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={UserDetailsSchema}
  >
    {({ values, handleChange, handleBlur, errors }) => (
      <VStack
        space={8}
        alignItems="stretch"
        flex={1}
        justifyContent="flex-start"
      >
        <FormikInput
          value={values.username}
          fieldName={USER_DETAILS.Username}
          handleBlur={handleBlur(USER_DETAILS.Username)}
          handleChange={handleChange(USER_DETAILS.Username)}
          errors={errors}
          label="Display name"
        />
        <FormikInputDate
          value={values.birthDate}
          fieldName={USER_DETAILS.BirthDate}
          handleChange={handleChange(USER_DETAILS.BirthDate)}
          errors={errors}
          label="Birth date"
        />
        <FormikInput
          value={values.phoneNumber}
          fieldName={USER_DETAILS.PhoneNumber}
          handleBlur={handleBlur(USER_DETAILS.PhoneNumber)}
          handleChange={handleChange(USER_DETAILS.PhoneNumber)}
          errors={errors}
          label="Phone number"
        />
      </VStack>
    )}
  </Formik>
))

// ref forwarding throws linting error otherwise
// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
UserDetailsForm.displayName = 'UserDetailsForm'
