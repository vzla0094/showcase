import { DiscoveryView } from '../views/DiscoveryView'

import { useEvents } from '../firebase'
import { DiscoveryStackScreenProps } from '../types'

export const DiscoveryScreen = ({
  navigation,
}: DiscoveryStackScreenProps<'Discovery'>) => {
  const eventCategories = useEvents()

  return (
    <DiscoveryView navigation={navigation} eventCategories={eventCategories} />
  )
}
