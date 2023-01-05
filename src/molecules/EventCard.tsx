import { useNavigation } from '@react-navigation/native'
import { Heading, Pressable, Text } from 'native-base'

import { DiscoveryStackScreenProps, IEvent } from '../types'

interface IEventCardProps {
  event: IEvent
  large?: boolean
}

export const EventCard = ({ event, large }: IEventCardProps) => {
  const navigation =
    useNavigation<DiscoveryStackScreenProps<'EventCategory'>['navigation']>()
  const { name, description, id, category } = event

  return (
    <Pressable
      size={large ? '320' : '150'}
      alignItems="center"
      justifyContent="center"
      borderColor="black"
      borderWidth={1}
      onPress={() => navigation.navigate('Event', { id, category })}
    >
      <Heading size="sm">{name}</Heading>
      <Text>{description}</Text>
    </Pressable>
  )
}
