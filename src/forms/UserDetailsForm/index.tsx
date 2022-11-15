import { Heading, VStack } from 'native-base'
import { IUserField, USER_DETAILS, UserDetailsType } from '../../types'
import { FirebaseInput } from '../../firebaseComponents/FirebaseInput'
import { UserDetailsSchema } from './schema'

interface IUserDetailsFormProps {
  onSubmit: (userDetail: IUserField) => void
  initialValues: UserDetailsType
}

export const UserDetailsForm = ({
  onSubmit,
  initialValues,
}: IUserDetailsFormProps) => {
  const userDetailsData = [
    { key: USER_DETAILS.username, label: 'Display name' },
    { key: USER_DETAILS.birthDay, label: 'Day of birth' },
    { key: USER_DETAILS.birthMonth, label: 'Month of birth' },
    { key: USER_DETAILS.birthYear, label: 'Year of birth' },
    { key: USER_DETAILS.phoneNumber, label: 'Phone number' },
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
