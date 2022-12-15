import { DiscoveryView } from '../views/DiscoveryView'
import { LoginBottomNavigation } from '../components/LoginBottomNavigation'
import { UnAuthStackScreenProps } from '../types'
import { useEvents } from '../../firebase'

interface IDiscoveryScreenProps {
  navigation: UnAuthStackScreenProps<'Discovery'>['navigation']
  loginBottom: boolean
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
