import { useAppDispatch, useAppSelector } from '../hooks'
import { setActiveEvent } from '../redux/slices/activeEvent'

import { useUserEvents } from '../firebase'

import { TabView } from '../molecules/TabView'
import { EventList } from '../molecules/EventList'
import { ViewContainer } from '../atoms/ViewContainer'

import { HandleEventPressType, UserTicketsStackScreenProps } from '../types'

export const MyTicketsScreen = ({
  navigation,
}: UserTicketsStackScreenProps<'MyTickets'>) => {
  const { eventsDataRefs, uid } = useAppSelector(({ user }) => user)
  const dispatch = useAppDispatch()

  const { userEvents, loading } = useUserEvents(uid, eventsDataRefs)

  const handleUserEventCardPress: HandleEventPressType =
    async eventSelector => {
      await dispatch(setActiveEvent(eventSelector))
      navigation.navigate('UserEventTickets')
    }

  const routes = [
    { key: 'upcoming', title: 'upcoming' },
    { key: 'pastTickets', title: 'past tickets' },
  ]

  return (
    <ViewContainer alignItems={'stretch'}>
      <TabView
        sceneMap={{
          upcoming: () => (
            <EventList
              events={userEvents.upcoming}
              onPress={handleUserEventCardPress}
              emptyMessage="There are no tickets!"
            />
          ),
          pastTickets: () => (
            <EventList
              events={userEvents.past}
              onPress={handleUserEventCardPress}
              emptyMessage="There are no tickets!"
            />
          ),
        }}
        routes={routes}
      />
    </ViewContainer>
  )
}
