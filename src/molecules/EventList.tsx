import { Box, FlatList, Text } from 'native-base'

import { HandleEventPressType, IEvent } from '../types'
import { EventCard } from './EventCard'

interface IEventListProps {
  events: Array<IEvent>
  onPress: HandleEventPressType
  emptyMessage?: string
}

export const EventList = ({
  events,
  onPress,
  emptyMessage = 'There are no events!',
}: IEventListProps) => (
  <FlatList
    mt={6}
    ItemSeparatorComponent={() => <Box h={1} />}
    ListEmptyComponent={
      !events.length ? (
        <Text
          mt={12}
          alignSelf="center"
          variant="description"
          color="trueGray.300"
        >
          {emptyMessage}
        </Text>
      ) : null
    }
    data={events}
    renderItem={({ item }) => (
      <EventCard
        showState
        event={item}
        onPress={() =>
          onPress({ eventId: item.id, eventCategory: item.category })
        }
      />
    )}
  />
)
