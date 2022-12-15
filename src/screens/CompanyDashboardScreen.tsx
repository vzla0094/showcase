import { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Button } from 'native-base'

import { FBCreateEvent, FBGetCompanyEvents } from '../../firebase'

import { useAppSelector } from '../hooks'

import { EventList } from '../molecules/EventList'
import { ViewContainer } from '../atoms/ViewContainer'

import { CompanyStackScreenProps, handleEventPressType, IEvent } from '../types'

export const CompanyDashboardScreen = ({
  navigation,
}: CompanyStackScreenProps<'CompanyDashboard'>) => {
  const companyId = useAppSelector(({ company }) => company.companyId)

  const [companyEvents, setCompanyEvents] = useState<Array<IEvent>>([])

  useFocusEffect(() => {
    const fetchCompanyEvents = async () => {
      const data = await FBGetCompanyEvents(companyId)
      setCompanyEvents(data)
    }

    fetchCompanyEvents()
  })

  const handleCreateEvent = async () => {
    const { id, category } = await FBCreateEvent(companyId)

    navigation.navigate('Event', {
      id,
      category,
      activeView: 'EventEditDetails',
    })
  }

  const handleEventPress: handleEventPressType = ({ id, category }) =>
    navigation.navigate('Event', { id, category, activeView: 'EventDetails' })

  return (
    <ViewContainer>
      <EventList events={companyEvents} onPress={handleEventPress} />
      <Button onPress={handleCreateEvent}>Create an Event</Button>
    </ViewContainer>
  )
}
