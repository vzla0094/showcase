import { useEffect } from 'react'

import { UserEventDetailsView } from '../views/UserEventDetailsView'

import { DiscoveryStackScreenProps } from '../types'
import { useAppSelector } from '../hooks'

export const UserEventScreen = ({
  navigation,
}: DiscoveryStackScreenProps<'Event'>) => {
  const { activeEvent } = useAppSelector(({ user }) => user)

  useEffect(() => {
    navigation.setOptions({ title: activeEvent.name })
  }, [navigation, activeEvent])

  return (
    <UserEventDetailsView
      event={activeEvent}
      onRedeem={() => navigation.navigate('TicketPurchase')}
    />
  )
}
