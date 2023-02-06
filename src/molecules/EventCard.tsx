import { useNavigation } from '@react-navigation/native'
import { Heading, Pressable, Text } from 'native-base'

import { DiscoveryStackScreenProps, IEvent } from '../types'
import { setActiveEvent } from '../redux/slices/activeEvent'
import { useAppDispatch } from '../hooks'

interface IEventCardProps {
  event: IEvent
  large?: boolean
}

export const EventCard = ({ event, large }: IEventCardProps) => {
  const dispatch = useAppDispatch()

  const navigation =
    useNavigation<DiscoveryStackScreenProps<'EventCategory'>['navigation']>()
  const { name, description, id, category } = event

  const onPress = async () => {
    await dispatch(setActiveEvent({ eventId: id, eventCategory: category }))
    navigation.navigate('Event')
  }

  return (
    <Pressable
      size={large ? '320' : '150'}
      alignItems="center"
      justifyContent="center"
      borderColor="black"
      borderWidth={1}
      onPress={onPress}
    >
      <Heading size="sm">{name}</Heading>
      <Text>{description}</Text>
    </Pressable>
  )
}
