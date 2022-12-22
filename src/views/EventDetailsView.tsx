import { ViewContainer } from '../atoms/ViewContainer'
import { Heading, IconButton, Text } from 'native-base'
import { useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { CompanyStackScreenProps, IEvent } from '../types'

interface IEventDetailsProps {
  event?: IEvent
}

export const EventDetailsView = ({ event }: IEventDetailsProps) => {
  const navigation =
    useNavigation<CompanyStackScreenProps<'Event'>['navigation']>()

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
