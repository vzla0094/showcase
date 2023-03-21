import { useCallback, useEffect, useState } from 'react'
import { Box, Heading, IconButton, useTheme } from 'native-base'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { useFocusEffect } from '@react-navigation/native'

import { FBGetCompanyEvents } from '../firebase'
import { useAppDispatch, useAppSelector } from '../hooks'
import { actions } from '../redux/slices'
import {
  setActiveEvent,
  setEventTickets,
  setEventTicketTypes,
} from '../redux/slices/activeEvent'

import { EventList } from '../molecules/EventList'
import { ViewContainer } from '../atoms/ViewContainer'

import {
  CompanyEventsType,
  CompanyStackScreenProps,
  handleEventPressType,
} from '../types'
import { PlusCircle } from 'phosphor-react-native'

export const CompanyDashboardScreen = ({
  navigation,
}: CompanyStackScreenProps<'CompanyDashboard'>) => {
  const { companyId, name } = useAppSelector(({ company }) => company)
  const dispatch = useAppDispatch()
  const { colors } = useTheme()

  // TabView related logic
  const [tabIndex, setTabIndex] = useState<number>(0)
  const routes = [
    { key: 'all', title: 'all' },
    { key: 'published', title: 'publish' },
    { key: 'expired', title: 'expired' },
    { key: 'draft', title: 'draft' },
  ]

  const [companyEvents, setCompanyEvents] = useState<CompanyEventsType>({
    published: [],
    draft: [],
    expired: [],
    all: [],
  })

  useEffect(() => {
    navigation.setOptions({ title: name })
  }, [])

  useFocusEffect(
    useCallback(() => {
      const fetchCompanyEvents = async () => {
        const data = await FBGetCompanyEvents(companyId)
        setCompanyEvents(data)
      }

      fetchCompanyEvents()
    }, [companyId])
  )

  const handleEventPress: handleEventPressType = async ({ id, category }) => {
    await Promise.all([
      dispatch(setActiveEvent({ eventId: id, eventCategory: category })),
      dispatch(setEventTickets({ eventId: id, eventCategory: category })),
      dispatch(setEventTicketTypes({ eventId: id, eventCategory: category })),
    ])

    navigation.navigate('Event', { id, category, activeView: 'EventDetails' })
  }

  const handleCreateEventPress = async () => {
    await dispatch(actions.activeEvent.resetActiveEvent())
    navigation.navigate('Event', {
      activeView: 'EventEditDetails',
    })
  }

  return (
    <ViewContainer alignItems="stretch">
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Heading>Events</Heading>
        <IconButton
          onPress={handleCreateEventPress}
          icon={<PlusCircle color={colors.tertiary['400']} size={30} />}
        />
      </Box>
      <TabView
        onIndexChange={setTabIndex}
        navigationState={{ index: tabIndex, routes }}
        renderScene={SceneMap({
          all: () => (
            <EventList events={companyEvents.all} onPress={handleEventPress} />
          ),
          published: () => (
            <EventList
              events={companyEvents.published}
              onPress={handleEventPress}
            />
          ),
          expired: () => (
            <EventList
              events={companyEvents.expired}
              onPress={handleEventPress}
            />
          ),
          draft: () => (
            <EventList
              events={companyEvents.draft}
              onPress={handleEventPress}
            />
          ),
        })}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: colors.tertiary['400'] }}
            style={{ backgroundColor: 'white' }}
            labelStyle={{
              color: colors.darkText,
              fontFamily: 'Raleway_600SemiBold',
            }}
            activeColor={colors.tertiary['400']}
          />
        )}
      />
    </ViewContainer>
  )
}
