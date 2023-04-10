import { Box, FlatList } from 'native-base'

import { HandleEventPressType, IEvent } from '../types'
import { EventCard } from './EventCard'
import { ListEmptyComponent } from '../atoms/ListEmptyComponent'

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
    ListEmptyComponent={<ListEmptyComponent message={emptyMessage} />}
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
