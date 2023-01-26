import { Button, Text } from 'native-base'
import { WebView } from 'react-native-webview'

import { ViewContainer } from '../atoms/ViewContainer'

import { getAddressQuery } from '../firebase'
import { IEvent } from '../types'

interface IUserEventDetailsProps {
  onRedeem: () => void
  event: IEvent
}

export const UserEventDetailsView = ({
  event,
  onRedeem,
}: IUserEventDetailsProps) => {
  const {
    category,
    description,
    startDateTime,
    endDateTime,
    ticketCount,
    ticketLimit,
  } = event

  const addressQuery = getAddressQuery(event)

  return (
    <ViewContainer alignItems="stretch">
      <Text>Category: {category}</Text>
      <Text>Description: {description}</Text>
      <Text>Start date: {startDateTime}</Text>
      <Text>End date: {endDateTime}</Text>
      <Text>Available tickets: {ticketLimit - ticketCount}</Text>
      <Button my={2} onPress={onRedeem}>
        Reserve
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
    </ViewContainer>
  )
}
