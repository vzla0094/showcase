import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import {
  FBDeleteEvent,
  FBGetEvent,
  FBEditEvent,
  FBCreateEvent,
} from '../firebase'

import { EventDetailsView } from '../views/EventDetailsView'
import {
  EventEditDetailsView,
  IOnSubmitPayload,
} from '../views/EventEditDetailsView'

import { CompanyStackScreenProps, emptyEvent, IEvent } from '../types'
import { useAppSelector } from '../hooks'

export const EventScreen = ({
  route,
  navigation,
}: CompanyStackScreenProps<'Event'>) => {
  const companyId = useAppSelector(({ company }) => company.companyId)
  const { id, category, activeView } = route.params
  const [event, setEvent] = useState<IEvent>(emptyEvent)

  useFocusEffect(
    useCallback(() => {
      // only fetches if event is already created
      // otherwise it uses the initialized emptyEvent
      if (!id || !category) return

      const fetchEvent = async () => {
        const data = await FBGetEvent(id, category)
        setEvent(data)
      }

      fetchEvent()

      return () => {
        setEvent(emptyEvent)
      }
    }, [id, category])
  )

  const handleSubmit = async (payload: IOnSubmitPayload) => {
    const { prevEvent, event } = payload
    if (prevEvent) await FBEditEvent(prevEvent, event)
    if (!prevEvent) await FBCreateEvent(companyId, event)

    navigation.goBack()
  }

  const handleDelete = async (event: IEvent) => {
    await FBDeleteEvent(event)
  }

  return activeView === 'EventDetails' ? (
    <EventDetailsView event={event} />
  ) : (
    <EventEditDetailsView
      event={event}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
    />
  )
}
