import { IEvent, IEventSelector } from '../types'
import { Heading, Pressable, Text } from 'native-base'

interface IUserEventCardProps {
  event: IEvent
  userTicketCount: number
  onPress: (eventSelector: IEventSelector) => void
}

export const UserEventCard = ({
  event,
  userTicketCount,
  onPress,
}: IUserEventCardProps) => (
  <Pressable
    p={4}
    bg="white"
    shadow={1}
    onPress={() =>
      onPress({ eventId: event.id, eventCategory: event.category })
    }
  >
    <Heading size="sm">{event.name}</Heading>
    <Text>
      {event.startDateTime} - {event.endDateTime}
    </Text>
    <Text>{userTicketCount} Tickets</Text>
  </Pressable>
)
