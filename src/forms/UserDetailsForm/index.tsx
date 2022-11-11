import { Heading, VStack } from 'native-base'
import { IUser } from '../../types'
import { FirebaseUserInput } from '../../components/FirebaseUserInput'
import { UserDetailsSchema } from './schema'

interface IUserDetailsFormProps {
  onSubmit: (data: IUser['details']) => void
  initialValues: IUser['details']
}

export const UserDetailsForm = ({
  onSubmit,
  initialValues,
}: IUserDetailsFormProps) => {
  return (
    <VStack space={2}>
      <Heading>User details</Heading>
      <FirebaseUserInput
        userKey="username"
        validationSchema={UserDetailsSchema.username}
        onSubmit={data => console.log(data)}
        label="Display name"
        placeholder="Display name"
      />
      <FirebaseUserInput
        userKey="birthDay"
        validationSchema={UserDetailsSchema.birthDay}
        onSubmit={data => console.log(data)}
        label="Day of birth"
        placeholder="Day of birth"
      />
      <FirebaseUserInput
        userKey="birthMonth"
        validationSchema={UserDetailsSchema.birthMonth}
        onSubmit={data => console.log(data)}
        label="Month of birth"
        placeholder="Month of birth"
      />
      <FirebaseUserInput
        userKey="birthYear"
        validationSchema={UserDetailsSchema.birthYear}
        onSubmit={data => console.log(data)}
        label="Year of birth"
        placeholder="Year of birth"
      />
      <FirebaseUserInput
        userKey="phoneNumber"
        validationSchema={UserDetailsSchema.phoneNumber}
        onSubmit={data => console.log(data)}
        label="Phone number"
        placeholder="Phone number"
      />
    </VStack>
  )
}
