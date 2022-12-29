import { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Button } from 'native-base'

import { FBGetCompanyEvents } from '../firebase'

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

  const handleEventPress: handleEventPressType = ({ id, category }) =>
    navigation.navigate('Event', { id, category, activeView: 'EventDetails' })

  return (
    <ViewContainer scroll alignItems="stretch">
      <EventList events={companyEvents} onPress={handleEventPress} />
      <Button
        onPress={() => {
          navigation.navigate('Event', {
            activeView: 'EventEditDetails',
          })
        }}
      >
        Create an Event
      </Button>
    </ViewContainer>
  )
}
