import { Heading, FlatList, Box } from 'native-base'

import { IEventCategory } from '../types'
import { GenericCard } from '../molecules/GenericCard'

export const EventCategory = ({ events, name, showMore }: IEventCategory) => {
  if (!events.length) return null

  const flatListData = [
    ...events.slice(0, 3),
    { showMore, eventCategoryName: name },
  ]

  return (
    <Box mb={5}>
      <Heading>{name}</Heading>
      <FlatList
        flexGrow={0}
        horizontal
        data={flatListData}
        renderItem={({ item }) => <GenericCard {...item} />}
      />
    </Box>
  )
}
