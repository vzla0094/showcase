import { useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { IconButton, Link, Text } from 'native-base'

import { ViewContainer } from '../atoms/ViewContainer'

import { CompanyStackScreenProps, IEvent } from '../types'

interface IEventDetailsProps {
  event: IEvent
  companyNavigation?: boolean
}

export const EventDetailsView = ({
  event,
  companyNavigation,
}: IEventDetailsProps) => {
  const navigation =
    useNavigation<CompanyStackScreenProps<'Event'>['navigation']>()
  const {
    name,
    category,
    address,
    description,
    startDateTime,
    endDateTime,
    ticketCount,
    ticketLimit,
  } = event

  useEffect(() => {
    if (!companyNavigation) return
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
      title: name,
    })
  }, [navigation, event, companyNavigation])

  return (
    <ViewContainer alignItems="stretch">
      <Text>Category: {category}</Text>
      <Text>
        Address: See map <Link>here</Link>
      </Text>
      <Text>Description: {description}</Text>
      <Text>Start date: {startDateTime}</Text>
      <Text>End date: {endDateTime}</Text>
      <Text>Available tickets: {ticketLimit - ticketCount}</Text>
    </ViewContainer>
  )
}
