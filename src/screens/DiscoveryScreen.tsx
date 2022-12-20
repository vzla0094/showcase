import { DiscoveryView } from '../views/DiscoveryView'
import { LoginBottomNavigation } from '../components/LoginBottomNavigation'

import { useEvents } from '../firebase'

import { UnAuthStackScreenProps } from '../types'

interface IDiscoveryScreenProps {
  navigation: UnAuthStackScreenProps<'Discovery'>['navigation']
  loginBottom?: boolean
}

export const DiscoveryScreen = ({
  navigation,
  loginBottom = false,
}: IDiscoveryScreenProps) => {
  const eventCategories = useEvents()

  return (
    <>
      <DiscoveryView eventCategories={eventCategories} />
      {loginBottom && <LoginBottomNavigation navigation={navigation} />}
    </>
  )
}
