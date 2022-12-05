import { IEventCategory } from '../types'
import { EventCategory } from '../components/EventCategory'
import { ViewContainer } from '../atoms/ViewContainer'

interface IDashboardView {
  eventCategories: Array<IEventCategory>
}

export const DiscoveryView = ({ eventCategories }: IDashboardView) => (
  <ViewContainer scroll alignment="stretch">
    {eventCategories.map((eventCategory, index) => (
      <EventCategory key={index} eventCategory={eventCategory} />
    ))}
  </ViewContainer>
)
