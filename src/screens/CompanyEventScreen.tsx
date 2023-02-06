import {
  FBDeleteEvent,
  FBEditEvent,
  FBCreateEvent,
  getAddressQuery,
  getEventGeoLocation,
} from '../firebase'

import { CompanyEventDetailsView } from '../views/CompanyEventDetailsView'
import {
  EventEditDetailsView,
  IOnSubmitPayload,
} from '../views/EventEditDetailsView'

import { useAppSelector } from '../hooks'
import { CompanyStackScreenProps, IEvent } from '../types'

export const CompanyEventScreen = ({
  route,
  navigation,
}: CompanyStackScreenProps<'Event'>) => {
  const { companyId, activeEvent } = useAppSelector(
    ({ company: { companyId }, activeEvent }) => ({
      companyId,
      activeEvent,
    })
  )
  const { activeView } = route.params

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
    <CompanyEventDetailsView activeEvent={activeEvent} />
  ) : (
    <EventEditDetailsView
      event={activeEvent.event}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
    />
  )
}
