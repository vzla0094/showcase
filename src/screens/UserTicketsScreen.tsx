import { Box, FlatList, Spinner } from 'native-base'

import { useAppDispatch, useAppSelector } from '../hooks'
import { setActiveEvent } from '../redux/slices/activeEvent'

import { useUserEvents } from '../firebase'

import { UserEventCard } from '../molecules/UserEventCard'
import { ViewContainer } from '../atoms/ViewContainer'

import { IEventSelector, UserTicketsStackScreenProps } from '../types'

export const UserTicketsScreen = ({
  navigation,
}: UserTicketsStackScreenProps<'UserTickets'>) => {
  const { eventsDataRefs, uid } = useAppSelector(({ user }) => user)
  const dispatch = useAppDispatch()

  const { eventsData, loading } = useUserEvents(uid, eventsDataRefs)

  const handleUserEventCardPress = async (eventSelector: IEventSelector) => {
    await dispatch(setActiveEvent(eventSelector))
    navigation.navigate('UserEventTickets')
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <ViewContainer alignItems={'stretch'}>
      <FlatList
        data={eventsData}
        keyExtractor={({ event }) => event.id}
        ItemSeparatorComponent={() => <Box height={2} />}
        renderItem={({ item }) => (
          <UserEventCard
            onPress={handleUserEventCardPress}
            event={item.event}
            userTicketCount={item.ticketCount}
          />
        )}
      />
    </ViewContainer>
  )
}
