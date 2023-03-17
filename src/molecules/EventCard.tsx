import { useNavigation } from '@react-navigation/native'
import { Box, Heading, Pressable, Square, Text } from 'native-base'

import { setActiveEvent } from '../redux/slices/activeEvent'
import { useAppDispatch } from '../hooks'

import { EventCategory } from './EventCategory'

import { formatDate } from '../helpers/formatDate'

import { DiscoveryStackScreenProps, IEvent } from '../types'

interface IEventCardProps {
  event: IEvent
}

export const EventCard = ({ event }: IEventCardProps) => {
  const dispatch = useAppDispatch()

  const navigation =
    useNavigation<DiscoveryStackScreenProps<'EventCategory'>['navigation']>()
  const { name, description, id, category, startDateTime } = event
  const { full: date } = formatDate(startDateTime)

  const onPress = async () => {
    await dispatch(setActiveEvent({ eventId: id, eventCategory: category }))
    navigation.navigate('Event')
  }

  return (
    <Pressable
      flex={1}
      borderColor="black"
      borderWidth={1}
      borderRadius={'md'}
      onPress={onPress}
      flexDirection="row"
    >
      <Square height={147} width={147} borderRightWidth={1}>
        <Text>Image placeholder</Text>
      </Square>
      <Box flex={1} p={2} justifyContent="space-between">
        <Box flex={1} justifyContent={'space-around'}>
          <Heading size="h3" color="tertiary.400">
            {name}
          </Heading>
          <Text variant="description" noOfLines={4}>
            {description}
          </Text>
        </Box>

        <Box>
          <Text variant="button">{date}</Text>
          <EventCategory category={category} />
        </Box>
      </Box>
    </Pressable>
  )
}
