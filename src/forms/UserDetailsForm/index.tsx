import { Box, VStack } from 'native-base'

import { FirebaseInput } from '../../firebaseComponents/FirebaseInput'
import { UserDetailsSchema } from './schema'

import { IUserDetailsField, USER_DETAILS, UserDetailsType } from '../../types'

interface IUserDetailsFormProps {
  onSubmit: (userDetailsField: IUserDetailsField) => void
  initialValues: UserDetailsType
}

export const UserDetailsForm = ({
  onSubmit,
  initialValues,
}: IUserDetailsFormProps) => (
  <VStack space={8} alignItems="stretch" flex={1} justifyContent="flex-start">
    <FirebaseInput
      fieldKey={USER_DETAILS.Username}
      validationSchema={UserDetailsSchema['username']}
      onSubmit={onSubmit}
      label="Display name"
      initialValue={initialValues.username}
    />
    <Box flexDirection="row">
      <FirebaseInput
        flex={1}
        mr={1}
        fieldKey={USER_DETAILS.BirthDay}
        validationSchema={UserDetailsSchema['birthDay']}
        onSubmit={onSubmit}
        label="Day"
        initialValue={initialValues.birthDay}
      />
      <FirebaseInput
        flex={1}
        mr={1}
        fieldKey={USER_DETAILS.BirthMonth}
        validationSchema={UserDetailsSchema['birthMonth']}
        onSubmit={onSubmit}
        label="Month"
        initialValue={initialValues.birthMonth}
      />
      <FirebaseInput
        flex={1}
        fieldKey={USER_DETAILS.BirthYear}
        validationSchema={UserDetailsSchema['birthYear']}
        onSubmit={onSubmit}
        label="Year"
        initialValue={initialValues.birthYear}
      />
    </Box>
    <FirebaseInput
      fieldKey={USER_DETAILS.PhoneNumber}
      validationSchema={UserDetailsSchema['phoneNumber']}
      onSubmit={onSubmit}
      label="Phone number"
      initialValue={initialValues.phoneNumber}
    />
  </VStack>
)
