import { Heading, VStack } from 'native-base'

import { IUserDetailsField, USER_DETAILS, UserDetailsType } from '../../types'
import { FirebaseInput } from '../../firebaseComponents/FirebaseInput'
import { UserDetailsSchema } from './schema'

interface IUserDetailsFormProps {
  onSubmit: (userDetailsField: IUserDetailsField) => void
  initialValues: UserDetailsType
}

export const UserDetailsForm = ({
  onSubmit,
  initialValues,
}: IUserDetailsFormProps) => {
  const userDetailsData = [
    { key: USER_DETAILS.Username, label: 'Display name' },
    { key: USER_DETAILS.BirthDay, label: 'Day of birth' },
    { key: USER_DETAILS.BirthMonth, label: 'Month of birth' },
    { key: USER_DETAILS.BirthYear, label: 'Year of birth' },
    { key: USER_DETAILS.PhoneNumber, label: 'Phone number' },
  ]

  return (
    <VStack space={2}>
      <Heading>User details</Heading>
      {userDetailsData.map(({ key, label }) => (
        <FirebaseInput
          fieldKey={key}
          validationSchema={UserDetailsSchema[key]}
          onSubmit={onSubmit}
          label={label}
          initialValue={initialValues[key]}
          key={key}
        />
      ))}
    </VStack>
  )
}
