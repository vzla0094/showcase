import { ReactNode } from 'react'
import { VStack } from 'native-base'

import { ReadOnlyField } from '../atoms/ReadOnlyField'
import { ViewContainer } from '../atoms/ViewContainer'

import { UserDetailsType } from '../types'

interface IProfileViewProps {
  editable: boolean
  userDetails: UserDetailsType
  children: ReactNode
}

export const EditableProfileView = ({
  editable,
  userDetails,
  children,
}: IProfileViewProps) => {
  return (
    <ViewContainer flexGrow={1} alignItems="stretch" title="About Me">
      {editable ? (
        children
      ) : (
        <VStack space={4}>
          <ReadOnlyField value={userDetails.username} label={'User name'} />
          <ReadOnlyField
            label={'Birth data'}
            value={new Date(userDetails.birthDate).toLocaleDateString()}
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
