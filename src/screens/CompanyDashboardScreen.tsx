import { Button } from 'native-base'

import { createEvent } from '../redux/slices/events'
import { useAppDispatch } from '../hooks'

import { ViewContainer } from '../atoms/ViewContainer'

import { CompanyStackScreenProps, IEvent } from '../types'

export const CompanyDashboardScreen = ({
  navigation,
}: CompanyStackScreenProps<'Dashboard'>) => {
  const dispatch = useAppDispatch()

  const handleCreateEvent = async () => {
    const action = await dispatch(createEvent())
    const payload = action.payload as IEvent

    navigation.navigate('CreateEvent', { eventId: payload.id })
  }

  return (
    <ViewContainer>
      <Button onPress={handleCreateEvent}>Create an Event</Button>
    </ViewContainer>
  )
}
