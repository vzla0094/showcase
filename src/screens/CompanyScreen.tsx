import { Button } from 'native-base'

import { ViewContainer } from '../atoms/ViewContainer'
import { CompanyStackScreenProps, IEvent } from '../types'
import { useAppDispatch } from '../hooks'
import { createEvent } from '../redux/slices/events'

export const CompanyScreen = ({
  navigation,
}: CompanyStackScreenProps<'Company'>) => {
  const dispatch = useAppDispatch()

  const handlePress = async () => {
    const action = await dispatch(createEvent())
    const payload = action.payload as IEvent

    navigation.navigate('CreateEvent', { eventId: payload.id })
  }

  return (
    <ViewContainer>
      <Button onPress={handlePress}>Create an Event</Button>
    </ViewContainer>
  )
}
