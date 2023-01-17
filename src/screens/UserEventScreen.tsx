import { useEffect } from 'react'

import { UserEventDetailsView } from '../views/UserEventDetailsView'

import { useEvent } from '../firebase'

import { DiscoveryStackScreenProps } from '../types'

export const UserEventScreen = ({
  route,
  navigation,
}: DiscoveryStackScreenProps<'Event'>) => {
  const { id, category } = route.params
  const event = useEvent(id, category)

  useEffect(() => {
    navigation.setOptions({ title: event.name })
  }, [navigation, event])

  return <UserEventDetailsView event={event} />
}
