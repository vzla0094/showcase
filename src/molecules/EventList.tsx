import { Box, FlatList, Text } from 'native-base'

import { handleEventPressType, IEvent } from '../types'
import { EventCard } from './EventCard'

interface IEventListProps {
  events: Array<IEvent>
  onPress: handleEventPressType
}

export const EventList = ({ events, onPress }: IEventListProps) => (
  <FlatList
    mt={6}
    ItemSeparatorComponent={() => <Box h={1} />}
    ListEmptyComponent={
      <Text
        mt={12}
        alignSelf="center"
        variant="description"
        color="trueGray.300"
      >
        There are no events!
      </Text>
    }
    data={events}
    renderItem={({ item }) => (
      <EventCard showState event={item} onPress={() => onPress(item)} />
    )}
  />
)
