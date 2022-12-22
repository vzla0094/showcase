import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { FBDeleteEvent, FBGetEvent, FBSetEventDetails } from '../firebase'

import { EventDetailsView } from '../views/EventDetailsView'
import { EventEditDetailsView } from '../views/EventEditDetailsView'

import { CompanyStackScreenProps, IEvent } from '../types'

export const EventScreen = ({ route }: CompanyStackScreenProps<'Event'>) => {
  const { id, category, activeView } = route.params
  const [event, setEvent] = useState<IEvent>()

  useFocusEffect(
    useCallback(() => {
      const fetchEvent = async () => {
        const data = await FBGetEvent(id, category)
        setEvent(data)
      }

      fetchEvent()
    }, [id, category])
  )

  const handleDetailsSubmit = async (prevEvent: IEvent, newEvent: IEvent) => {
    const data = await FBSetEventDetails(prevEvent, newEvent)
    setEvent(data)
  }

  const handleDelete = async (event: IEvent) => {
    await FBDeleteEvent(event)
  }

  return activeView === 'EventDetails' ? (
    <EventDetailsView event={event} />
  ) : (
    <EventEditDetailsView
      event={event}
      onSubmit={handleDetailsSubmit}
      onDelete={handleDelete}
    />
  )
}
