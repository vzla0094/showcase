import { UserDetailsForm } from '../forms/UserDetailsForm'
import { VStack } from 'native-base'
import { ReadOnlyField } from '../atoms/ReadOnlyField'
import { ViewContainer } from '../atoms/ViewContainer'
import { IUserDetailsField, UserDetailsType } from '../types'

interface IProfileViewProps {
  edit: boolean
  onSubmit: (userDetailsField: IUserDetailsField) => void
  userDetails: UserDetailsType
}

export const ProfileView = ({
  edit,
  onSubmit,
  userDetails,
}: IProfileViewProps) => {
  return (
    <ViewContainer flexGrow={1} alignItems="stretch" title="About Me">
      {edit ? (
        <UserDetailsForm onSubmit={onSubmit} initialValues={userDetails} />
      ) : (
        <VStack space={4}>
          <ReadOnlyField value={userDetails.username} label={'User name'} />
          <ReadOnlyField
            label={'Birth data'}
            value={`${userDetails.birthMonth}/${userDetails.birthDay}/${userDetails.birthYear}`}
          />
          <ReadOnlyField
            label={'Phone number'}
            value={userDetails.phoneNumber}
          />
        </VStack>
      )}
    </ViewContainer>
  )
}
