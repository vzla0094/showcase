import { Box, Heading, Pressable, Text, VStack } from 'native-base'

import { handleEventPressType, IEvent } from '../types'

interface IEventListProps {
  events: Array<IEvent>
  onPress: handleEventPressType
}

export const EventList = ({ events, onPress }: IEventListProps) => (
  <Box>
    <Heading>Events</Heading>
    <VStack space="sm">
      {events.map(({ id, name, description, category, state }) => (
        <Box key={id} borderWidth={1}>
          <Pressable onPress={() => onPress({ id, category })}>
            <Heading size="sm">Name: {name}</Heading>
            {Boolean(description) && <Text>Description: {description}</Text>}
            <Text>Category: {category}</Text>
            <Text>State: {state}</Text>
          </Pressable>
        </Box>
      ))}
    </VStack>
  </Box>
)
