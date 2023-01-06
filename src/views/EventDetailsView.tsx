import { useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { IconButton, Text } from 'native-base'
import { WebView } from 'react-native-webview'

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
    description,
    startDateTime,
    endDateTime,
    ticketCount,
    ticketLimit,
    streetAddress,
    city,
    stateProvince,
    country,
    zipCode,
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

  const mapQuery = `${streetAddress
    .split(' ')
    .join('+')},+${city},+${stateProvince},+${country},+${zipCode}`

  return (
    <ViewContainer alignItems="stretch">
      <Text>Category: {category}</Text>
      <Text>Description: {description}</Text>
      <Text>Start date: {startDateTime}</Text>
      <Text>End date: {endDateTime}</Text>
      <Text>Available tickets: {ticketLimit - ticketCount}</Text>
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
                &q=${mapQuery}">
            </iframe>
          `,
        }}
      />
    </ViewContainer>
  )
}
