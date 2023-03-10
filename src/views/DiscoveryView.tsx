import { useState } from 'react'
import { Box, FlatList } from 'native-base'
import { FireSimple } from 'phosphor-react-native'

import { EventCard } from '../molecules/EventCard'
import { EventCategory } from '../molecules/EventCategory'
import { ViewContainer } from '../atoms/ViewContainer'
import { ChipIcon } from '../atoms/ChipIcon'

import { EVENT_CATEGORY_NAMES, IEventCategory } from '../types'

interface IDashboardView {
  eventCategories: Array<IEventCategory>
}

export const DiscoveryView = ({ eventCategories }: IDashboardView) => {
  const activeCategoriesInitialState: Record<EVENT_CATEGORY_NAMES, boolean> = {
    [EVENT_CATEGORY_NAMES.Accommodation]: false,
    [EVENT_CATEGORY_NAMES.Activities]: false,
    [EVENT_CATEGORY_NAMES.Food]: false,
    [EVENT_CATEGORY_NAMES.Transportation]: false,
    [EVENT_CATEGORY_NAMES.Venues]: false,
  }

  const [activeCategories, setActiveCategories] = useState<
    typeof activeCategoriesInitialState
  >(activeCategoriesInitialState)
  const [activeLatest, setActiveLatest] = useState<boolean>(true)

  const events = eventCategories
    .map(eventCategory => eventCategory.events)
    .flat()

  const eventCategoryNames = eventCategories.map(
    eventCategory => eventCategory.name
  )

  const handleLatestPress = () => {
    setActiveLatest(prevState => !prevState)
    setActiveCategories(activeCategoriesInitialState)
  }

  const handleCategoryPress = (name: EVENT_CATEGORY_NAMES) => {
    setActiveCategories(prevState => {
      const newState = { ...prevState }
      newState[name] = !newState[name]

      return newState
    })
    setActiveLatest(false)
  }

  return (
    <>
      <FlatList
        ListHeaderComponent={() => (
          <ChipIcon
            active={activeLatest}
            onPress={handleLatestPress}
            mr={2}
            icon={props => <FireSimple {...props} />}
          >
            Latest
          </ChipIcon>
        )}
        horizontal
        flexGrow={0}
        pt={2}
        pl={2}
        pb={6}
        ItemSeparatorComponent={() => <Box width={2} />}
        data={eventCategoryNames}
        renderItem={({ item }) => (
          <EventCategory
            active={activeCategories[item]}
            onPress={handleCategoryPress}
            variant="chip"
            key={item}
            category={item}
          />
        )}
      />
      <ViewContainer title="Latest Events" alignItems="stretch">
        <FlatList
          data={events}
          ItemSeparatorComponent={() => <Box height={2} />}
          renderItem={({ item }) => <EventCard event={item} />}
        />
      </ViewContainer>
    </>
  )
}
