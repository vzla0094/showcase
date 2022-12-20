import { ViewContainer } from '../atoms/ViewContainer'
import { Heading, IconButton, Text } from 'native-base'
import { useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons'

import { CompanyStackScreenProps, IEvent } from '../types'

interface IEventDetailsProps {
  event?: IEvent
  navigation: CompanyStackScreenProps<'Event'>['navigation']
}

export const EventDetailsView = ({ event, navigation }: IEventDetailsProps) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          onPress={() => navigation.goBack()}
          _icon={{
            as: FontAwesome,
            name: 'chevron-left',
          }}
        />
      ),
      headerRight: () => (
        <IconButton
          onPress={() => {
            navigation.setParams({
              activeView: 'EventEditDetails',
            })
          }}
          _icon={{
            as: FontAwesome,
            name: 'gear',
          }}
        />
      ),
    })
  }, [navigation])

  if (!event) return null

  return (
    <ViewContainer alignItems="stretch">
      <Heading>{event.name}</Heading>
      <Text>{event.description}</Text>
      <Text>{event.category}</Text>
    </ViewContainer>
  )
}
