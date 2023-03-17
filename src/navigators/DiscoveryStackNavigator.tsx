import { IconButton, useTheme } from 'native-base'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CaretLeft, Faders } from 'phosphor-react-native'

import { DiscoveryScreen } from '../screens/DiscoveryScreen'
import { EventCategoryScreen } from '../screens/EventCategoryScreen'
import { HighlightsScreen } from '../screens/HighlightsScreen'
import { UserEventScreen } from '../screens/UserEventScreen'
import { TicketPurchaseScreen } from '../screens/TicketPurchaseScreen'
import { TicketConfirmationScreen } from '../screens/TicketConfirmationScreen'
import { UserEventTicketScreen } from '../screens/UserEventTicketScreen'

import { DiscoveryStackParamList, DiscoveryStackScreenProps } from '../types'
import { UserEventTicketsScreen } from '../screens/UserEventTicketsScreen'

const Stack = createNativeStackNavigator<DiscoveryStackParamList>()

export const DiscoveryStackNavigator = () => {
  const { fontSizes, colors } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTitleStyle: {
          fontSize: fontSizes['xl'],
          fontWeight: '400',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Discovery"
        options={({ navigation }: DiscoveryStackScreenProps<'Discovery'>) => ({
          headerRight: () => (
            <IconButton
              onPress={() => navigation.navigate('Highlights')}
              icon={<Faders color={colors.lightText} size={24} />}
            />
          ),
        })}
        component={DiscoveryScreen}
      />
      <Stack.Screen
        options={({ route }) => ({ title: route.params.eventCategoryName })}
        name="EventCategory"
        component={EventCategoryScreen}
      />
      <Stack.Screen
        options={({ navigation }: DiscoveryStackScreenProps<'Highlights'>) => ({
          title: 'Highlights',
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.goBack()}
              icon={<CaretLeft color={colors.lightText} size={24} />}
            />
          ),
        })}
        name="Highlights"
        component={HighlightsScreen}
      />
      <Stack.Screen
        options={({ navigation }: DiscoveryStackScreenProps<'Event'>) => ({
          title: '',
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.goBack()}
              icon={<CaretLeft color={colors.lightText} size={24} />}
            />
          ),
        })}
        name="Event"
        component={UserEventScreen}
      />
      <Stack.Screen name="TicketPurchase" component={TicketPurchaseScreen} />
      <Stack.Screen
        name="TicketConfirmation"
        options={{
          headerShown: false,
        }}
        component={TicketConfirmationScreen}
      />
      <Stack.Screen
        options={{ title: 'My tickets' }}
        name="UserEventTickets"
        component={UserEventTicketsScreen}
      />
      <Stack.Screen name="UserEventTicket" component={UserEventTicketScreen} />
    </Stack.Navigator>
  )
}
