import { Heading, Text } from 'native-base'

import { ViewContainer } from '../atoms/ViewContainer'
import { useEvent } from '../hooks'

import { CompanyStackScreenProps } from '../types'

export const EventScreen = ({ route }: CompanyStackScreenProps<'Event'>) => {
  const event = useEvent(route.params.id)

  if (!event) return null

  return (
    <ViewContainer>
      <Heading>{event.name}</Heading>
      <Text>{event.description}</Text>
    </ViewContainer>
  )
}
