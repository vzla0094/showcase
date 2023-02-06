import { Box, Center, Heading, VStack, Text } from 'native-base'
import { IActiveEventState, ITicket } from '../types'

interface TicketProps {
  ticket: ITicket
  activeEvent: IActiveEventState
}

export const Ticket = ({ ticket, activeEvent }: TicketProps) => {
  return (
    <Box p={4} m={4} backgroundColor="white">
      <Center>
        <Heading>{activeEvent.event.name}</Heading>
      </Center>
      <VStack my={2}>
        <Text color="gray.500">Name</Text>
        <Text fontSize={24}>{ticket.userName}</Text>
      </VStack>
      <VStack my={2}>
        <Text color="gray.500">Ticket</Text>
        <Text fontSize={18}>
          {
            activeEvent.ticketTypes.find(
              ticketType => ticketType.id === ticket.ticketTypeId
            )?.name
          }
        </Text>
      </VStack>
      <VStack my={2}>
        <Text color="gray.500">ID</Text>
        <Text fontSize={18}>{ticket.id}</Text>
      </VStack>
      <VStack my={2}>
        <Text color="gray.500">Date</Text>
        <Text fontSize={18}>
          {activeEvent.event.startDateTime} - {activeEvent.event.endDateTime}
        </Text>
      </VStack>
    </Box>
  )
}
