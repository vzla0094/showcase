import { Box, Heading, Pressable, Text, VStack } from 'native-base'

import { handleEventPressType, IEvent } from '../types'

interface IEventListProps {
  events: Array<IEvent>
  onPress: handleEventPressType
}

export const EventList = ({ events, onPress }: IEventListProps) => (
  <Box>
    <Heading>Events</Heading>
    <VStack>
      {events.map(({ id, name, description, category }) => (
        <Box key={id}>
          <Pressable onPress={() => onPress({ id, category })}>
            <Heading size="sm">{name}</Heading>
            {Boolean(description) && <Text>{description}</Text>}
            <Text>{category}</Text>
          </Pressable>
        </Box>
      ))}
    </VStack>
  </Box>
)
