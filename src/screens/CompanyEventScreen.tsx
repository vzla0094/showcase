import {
  FBDeleteEvent,
  FBEditEvent,
  FBCreateEvent,
  useEvent,
  getAddressQuery,
  getEventGeoLocation,
} from '../firebase'

import { EventDetailsView } from '../views/EventDetailsView'
import {
  EventEditDetailsView,
  IOnSubmitPayload,
} from '../views/EventEditDetailsView'

import { CompanyStackScreenProps, IEvent } from '../types'
import { useAppSelector } from '../hooks'

export const CompanyEventScreen = ({
  route,
  navigation,
}: CompanyStackScreenProps<'Event'>) => {
  const companyId = useAppSelector(({ company }) => company.companyId)
  const { id, category, activeView } = route.params
  const event = useEvent(id, category)

  const handleSubmit = async (payload: IOnSubmitPayload) => {
    const { prevEvent, event } = payload

    const eventAddressQuery = getAddressQuery(event)
    const eventGeoLocation = await getEventGeoLocation(eventAddressQuery)

    const eventWithGeoLocation = { ...event, ...eventGeoLocation }

    if (prevEvent) await FBEditEvent(prevEvent, eventWithGeoLocation)
    if (!prevEvent) await FBCreateEvent(companyId, eventWithGeoLocation)

    navigation.goBack()
  }

  const handleDelete = async (event: IEvent) => {
    await FBDeleteEvent(event)
  }

  return activeView === 'EventDetails' ? (
    <EventDetailsView event={event} companyNavigation />
  ) : (
    <EventEditDetailsView
      event={event}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
    />
  )
}
