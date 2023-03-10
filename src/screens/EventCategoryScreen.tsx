import { useEventCategoryObserver } from '../firebase'

import { ViewContainer } from '../atoms/ViewContainer'

import { DiscoveryStackScreenProps } from '../types'
import { EventCard } from '../molecules/EventCard'
import { Stack } from 'native-base'

export const EventCategoryScreen = ({
  route,
}: DiscoveryStackScreenProps<'EventCategory'>) => {
  const data = useEventCategoryObserver(route.params.eventCategoryName)

  return (
    <ViewContainer scroll>
      <Stack space="sm">
        {data.events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </Stack>
    </ViewContainer>
  )
}
