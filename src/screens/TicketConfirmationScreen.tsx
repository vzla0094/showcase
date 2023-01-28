import { Box, Button, Heading, Text } from 'native-base'
import { ViewContainer } from '../atoms/ViewContainer'
import { useAppSelector } from '../hooks'
import { DiscoveryStackScreenProps } from '../types'

export const TicketConfirmationScreen = ({
  navigation,
}: DiscoveryStackScreenProps<'TicketConfirmation'>) => {
  const { details, event } = useAppSelector(
    ({ user: { details, activeEvent } }) => ({
      details,
      event: activeEvent,
    })
  )

  return (
    <ViewContainer justifyContent="space-between">
      <Box mt={5}>
        <Heading>Tickets Reserved!</Heading>
        <Text fontSize={14}>See you at the event {details.username}!</Text>

        <Box alignItems="center" mt={48}>
          <Heading size="xl">{event.name}</Heading>
        </Box>
      </Box>

      <Box width="full">
        <Button onPress={() => navigation.navigate('UserEventTicket')}>
          View My Tickets
        </Button>
      </Box>
    </ViewContainer>
  )
}
