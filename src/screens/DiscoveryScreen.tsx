import { useAppSelector } from '../hooks'
import { DiscoveryView } from '../views/DiscoveryView'
import { LoginBottomNavigation } from '../components/LoginBottomNavigation'
import { EVENT_CATEGORIES, UnAuthStackScreenProps } from '../types'

interface IDiscoveryScreenProps {
  navigation: UnAuthStackScreenProps<'Discovery'>['navigation']
  loginBottom: boolean
}

export const DiscoveryScreen = ({
  navigation,
  loginBottom = false,
}: IDiscoveryScreenProps) => {
  const eventCategories = useAppSelector(({ events }) => {
    const names = Object.keys(events.categories) as Array<EVENT_CATEGORIES>

    return names.map(name => ({
      name,
      events: [...events.categories[name]],
    }))
  })

  return (
    <>
      <DiscoveryView eventCategories={eventCategories} />
      {loginBottom && <LoginBottomNavigation navigation={navigation} />}
    </>
  )
}
