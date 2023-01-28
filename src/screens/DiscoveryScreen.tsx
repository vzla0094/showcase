import { DiscoveryView } from '../views/DiscoveryView'

import { useEvents } from '../firebase'
import { DiscoveryStackScreenProps } from '../types'
import { ViewContainer } from '../atoms/ViewContainer'
import { Button } from 'native-base'

export const DiscoveryScreen = ({
  navigation,
}: DiscoveryStackScreenProps<'Discovery'>) => {
  const eventCategories = useEvents()

  return (
    <ViewContainer>
      <DiscoveryView eventCategories={eventCategories} />
      <Button onPress={() => navigation.navigate('TicketConfirmation')}>
        Confirmation
      </Button>
    </ViewContainer>
  )
}
