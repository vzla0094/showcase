import { useEffect } from 'react'

import { UserEventDetailsView } from '../views/UserEventDetailsView'

import { DiscoveryStackScreenProps } from '../types'
import { useAppSelector } from '../hooks'

export const UserEventScreen = ({
  navigation,
}: DiscoveryStackScreenProps<'Event'>) => {
  const { event } = useAppSelector(({ activeEvent }) => activeEvent)

  useEffect(() => {
    navigation.setOptions({ title: event.name })
  }, [navigation, event])

  return (
    <UserEventDetailsView
      event={event}
      onRedeem={() => navigation.navigate('TicketPurchase')}
    />
  )
}
