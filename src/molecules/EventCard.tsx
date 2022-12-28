import { Heading, Square, Text } from 'native-base'

import { IEvent } from '../types'

interface IEventCardProps {
  event: IEvent
  large?: boolean
}

export const EventCard = ({ event, large }: IEventCardProps) => (
  <Square
    size={large ? '320' : '150'}
    alignItems="center"
    justifyContent="center"
    borderColor="black"
    borderWidth={1}
  >
    <Heading size="sm">{event.name}</Heading>
    <Text>{event.description}</Text>
  </Square>
)
