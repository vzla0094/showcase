import { EventCategory } from '../components/EventCategory'
import { ViewContainer } from '../atoms/ViewContainer'

import { IEventCategory } from '../types'

interface IDashboardView {
  eventCategories: Array<IEventCategory>
}

export const DiscoveryView = ({ eventCategories }: IDashboardView) => (
  <ViewContainer scroll alignItems="stretch">
    {eventCategories.map((eventCategory, index) => (
      <EventCategory key={index} eventCategory={eventCategory} />
    ))}
  </ViewContainer>
)
