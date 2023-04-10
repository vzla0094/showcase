import { useCallback, useEffect, useState } from 'react'
import { Box, Heading, IconButton, useTheme } from 'native-base'
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
import { TabView } from '../molecules/TabView'
import { ViewContainer } from '../atoms/ViewContainer'

import {
  CompanyEventsType,
  CompanyStackScreenProps,
  HandleEventPressType,
} from '../types'
import { PlusCircle } from 'phosphor-react-native'

export const CompanyDashboardScreen = ({
  navigation,
}: CompanyStackScreenProps<'CompanyDashboard'>) => {
  const { companyId, name } = useAppSelector(({ company }) => company)
  const dispatch = useAppDispatch()
  const { colors } = useTheme()

  const routes = [
    { key: 'all', title: 'all' },
    { key: 'published', title: 'publish' },
    { key: 'expired', title: 'expired' },
    { key: 'draft', title: 'draft' },
  ]

  const initialCompanyEvents: CompanyEventsType = {
    published: [],
    draft: [],
    expired: [],
    all: [],
  }

  const [companyEvents, setCompanyEvents] =
    useState<CompanyEventsType>(initialCompanyEvents)

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

      return () => {
        setCompanyEvents(initialCompanyEvents)
      }
    }, [companyId])
  )

  const handleEventPress: HandleEventPressType = async eventSelector => {
    await Promise.all([
      dispatch(setActiveEvent(eventSelector)),
      dispatch(setEventTickets(eventSelector)),
      dispatch(setEventTicketTypes(eventSelector)),
    ])

    navigation.navigate('Event', {
      id: eventSelector.eventId,
      category: eventSelector.eventCategory,
      activeView: 'EventDetails',
    })
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
        sceneMap={{
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
        }}
        routes={routes}
      />
    </ViewContainer>
  )
}
