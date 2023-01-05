import { IconButton } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { DiscoveryScreen } from '../screens/DiscoveryScreen'
import { EventCategoryScreen } from '../screens/EventCategoryScreen'
import { HighlightsScreen } from '../screens/HighlightsScreen'
import { UserEventScreen } from '../screens/UserEventScreen'

import { DiscoveryStackParamList, DiscoveryStackScreenProps } from '../types'

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
  </Stack.Navigator>
)
