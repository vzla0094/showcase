import { DiscoveryView } from '../views/DiscoveryView'

import { useEvents } from '../firebase'

export const DiscoveryScreen = () => {
  const eventCategories = useEvents()

  return <DiscoveryView eventCategories={eventCategories} />
}
