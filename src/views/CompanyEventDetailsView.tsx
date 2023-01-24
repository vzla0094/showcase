import { useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Button, IconButton, Text, VStack } from 'native-base'
import { WebView } from 'react-native-webview'

import { getAddressQuery } from '../firebase'

import { ViewContainer } from '../atoms/ViewContainer'
import { EventTicketsButton } from '../molecules/EventTicketsButton'

import { CompanyStackScreenProps, IActiveEvent } from '../types'

interface ICompanyEventDetailsProps {
  event: IActiveEvent
}

export const CompanyEventDetailsView = ({
  event,
}: ICompanyEventDetailsProps) => {
  const navigation =
    useNavigation<CompanyStackScreenProps<'Event'>['navigation']>()
  const {
    name,
    category,
    description,
    startDateTime,
    endDateTime,
    ticketCount,
    ticketLimit,
  } = event

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
      title: name,
    })
  }, [navigation, event])

  const addressQuery = getAddressQuery(event)

  return (
    <ViewContainer alignItems="stretch">
      <VStack space={2} flex={1}>
        <Text>Category: {category}</Text>
        <Text>Description: {description}</Text>
        <Text>Start date: {startDateTime}</Text>
        <Text>End date: {endDateTime}</Text>
        <Text>Available tickets: {ticketLimit - ticketCount}</Text>
        <EventTicketsButton
          onPress={() => navigation.navigate('EventTickets')}
          ticketTypesCount={event.ticketTypes.length}
        />
        <Button onPress={() => navigation.navigate('TicketTypes')}>
          Redemptions
        </Button>
        <WebView
          source={{
            html: `
            <iframe
              width="100%"
              height="100%"
              style="border:0"
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAhWL-VE6px-42zW-veEUddTpIstjtxzJM
                &q=${addressQuery}">
            </iframe>
          `,
          }}
        />
      </VStack>
    </ViewContainer>
  )
}
