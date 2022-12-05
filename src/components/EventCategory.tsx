import { Heading, FlatList, Box } from 'native-base'
import { IEventCategory } from '../types'
import { EventCard } from './EventCard'

interface IEventCategoryProps {
  eventCategory: IEventCategory
}

export const EventCategory = ({ eventCategory }: IEventCategoryProps) => {
  if (!eventCategory.events.length) return null

  return (
    <Box mb={5}>
      <Heading>{eventCategory.name}</Heading>
      <FlatList
        flexGrow={0}
        horizontal
        data={eventCategory.events}
        renderItem={({ item }) => (
          <Box mr={3}>
            <EventCard name={item.name} description={item.description} />
          </Box>
        )}
      />
    </Box>
  )
}
