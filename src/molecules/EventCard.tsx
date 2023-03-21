import {
  Badge,
  Box,
  Heading,
  IPressableProps,
  Pressable,
  Square,
  Text,
} from 'native-base'

import { EventCategory } from './EventCategory'

import { formatDate } from '../helpers/formatDate'

import { IEvent } from '../types'

interface IEventCardProps extends Pick<IPressableProps, 'onPress'> {
  event: IEvent
  showState?: boolean
}

export const EventCard = ({
  event,
  showState = false,
  onPress,
}: IEventCardProps) => {
  const { name, description, category, startDateTime, state } = event
  const { full: date } = formatDate(startDateTime)

  const stateBadgeBg: Record<IEvent['state'], string> = {
    published: 'tertiary.400',
    draft: 'trueGray.300',
    expired: 'darkText',
  }

  const stateBadgeText = event.state === 'draft' ? 'darkText' : 'text.50'

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

        <Text variant="button">{date}</Text>

        <Box flexDirection="row" justifyContent="space-between">
          <EventCategory category={category} />
          {showState && (
            <Badge bg={stateBadgeBg[state]} _text={{ color: stateBadgeText }}>
              {state}
            </Badge>
          )}
        </Box>
      </Box>
    </Pressable>
  )
}
