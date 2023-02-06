import { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Button } from 'native-base'

import { FBGetCompanyEvents } from '../firebase'

import { useAppDispatch, useAppSelector } from '../hooks'
import { actions } from '../redux/slices'
import {
  setActiveEvent,
  setEventTickets,
  setEventTicketTypes,
} from '../redux/slices/activeEvent'

import { EventList } from '../molecules/EventList'
import { ViewContainer } from '../atoms/ViewContainer'

import { CompanyStackScreenProps, handleEventPressType, IEvent } from '../types'

export const CompanyDashboardScreen = ({
  navigation,
}: CompanyStackScreenProps<'CompanyDashboard'>) => {
  const companyId = useAppSelector(({ company }) => company.companyId)
  const dispatch = useAppDispatch()

  const [companyEvents, setCompanyEvents] = useState<Array<IEvent>>([])

  useFocusEffect(() => {
    const fetchCompanyEvents = async () => {
      const data = await FBGetCompanyEvents(companyId)
      setCompanyEvents(data)
    }

    fetchCompanyEvents()
  })

  const handleEventPress: handleEventPressType = async ({ id, category }) => {
    await Promise.all([
      dispatch(setActiveEvent({ eventId: id, eventCategory: category })),
      dispatch(setEventTickets({ eventId: id, eventCategory: category })),
      dispatch(setEventTicketTypes({ eventId: id, eventCategory: category })),
    ])

    navigation.navigate('Event', { id, category, activeView: 'EventDetails' })
  }

  const handleCreateEventPress = async () => {
    await dispatch(actions.activeEvent.resetActiveEvent())
    navigation.navigate('Event', {
      activeView: 'EventEditDetails',
    })
  }

  return (
    <ViewContainer scroll alignItems="stretch">
      <EventList events={companyEvents} onPress={handleEventPress} />
      <Button onPress={handleCreateEventPress}>Create an Event</Button>
    </ViewContainer>
  )
}
