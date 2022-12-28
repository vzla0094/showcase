import { Heading, Pressable, Square } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { DiscoveryStackScreenProps, IEvent } from '../types'

export type ShowMoreCardProps = {
  showMore: boolean
  eventCategoryName: IEvent['category']
}

export const ShowMoreCard = ({ eventCategoryName }: ShowMoreCardProps) => {
  const navigation =
    useNavigation<DiscoveryStackScreenProps<'Discovery'>['navigation']>()

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('EventCategory', { eventCategoryName })
      }
    >
      <Square size="150" borderColor="black" borderWidth={1}>
        <Heading>Show more ...</Heading>
      </Square>
    </Pressable>
  )
}
