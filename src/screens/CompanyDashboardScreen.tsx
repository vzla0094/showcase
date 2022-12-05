import { Button } from 'native-base'

import { FBCreateEvent } from '../../firebase'

import { useAppSelector } from '../hooks'

import { EventList } from '../molecules/EventList'
import { ViewContainer } from '../atoms/ViewContainer'

import { CompanyStackScreenProps, handleEventPressType } from '../types'

export const CompanyDashboardScreen = ({
  navigation,
}: CompanyStackScreenProps<'CompanyDashboard'>) => {
  const companyId = useAppSelector(({ company }) => company.companyId)
  const companyEvents = useAppSelector(({ events }) =>
    events.allEvents.filter(event => event.company === companyId)
  )

  const handleCreateEvent = async () => {
    const { id } = await FBCreateEvent(companyId)

    navigation.navigate('EditEvent', { id })
  }

  const handleEventPress: handleEventPressType = id =>
    navigation.navigate('Event', { id })

  return (
    <ViewContainer>
      <EventList events={companyEvents} onPress={handleEventPress} />
      <Button onPress={handleCreateEvent}>Create an Event</Button>
    </ViewContainer>
  )
}
