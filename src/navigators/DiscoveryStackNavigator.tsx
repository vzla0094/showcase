import { IconButton } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

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

export const DiscoveryStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Discovery"
      options={({ navigation }: DiscoveryStackScreenProps<'Discovery'>) => ({
        headerRight: () => (
          <IconButton
            onPress={() => navigation.navigate('Highlights')}
            _icon={{
              as: FontAwesome,
              name: 'sliders',
            }}
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
      options={{ title: 'Highlights' }}
      name="Highlights"
      component={HighlightsScreen}
    />
    <Stack.Screen
      options={{ title: '' }}
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
