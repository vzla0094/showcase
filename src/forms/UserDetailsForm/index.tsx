import { Heading, VStack } from 'native-base'
import { IUser, USER_DETAILS, UserDetailType } from '../../types'
import { FirebaseUserInput } from '../../components/FirebaseUserInput'
import { UserDetailsSchema } from './schema'

interface IUserDetailsFormProps {
  onSubmit: (userDetail: UserDetailType) => void
  initialValues: IUser['details']
}

export const UserDetailsForm = ({
  onSubmit,
  initialValues,
}: IUserDetailsFormProps) => {
  const userDetailsKeys = [
    USER_DETAILS.username,
    USER_DETAILS.birthDay,
    USER_DETAILS.birthMonth,
    USER_DETAILS.birthYear,
    USER_DETAILS.phoneNumber,
  ]

  const labels = {
    [USER_DETAILS.username]: 'Display name',
    [USER_DETAILS.birthDay]: 'Day of birth',
    [USER_DETAILS.birthMonth]: 'Month of birth',
    [USER_DETAILS.birthYear]: 'Year of birth',
    [USER_DETAILS.phoneNumber]: 'Phone number',
  }

  return (
    <VStack space={2}>
      <Heading>User details</Heading>
      {userDetailsKeys.map(userDetailKey => (
        <FirebaseUserInput
          userDetailKey={userDetailKey}
          validationSchema={UserDetailsSchema[userDetailKey]}
          onSubmit={onSubmit}
          label={labels[userDetailKey]}
          placeholder={labels[userDetailKey]}
          initialValue={initialValues[userDetailKey]}
          key={userDetailKey}
        />
      ))}
    </VStack>
  )
}
