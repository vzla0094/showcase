import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { DiscoveryScreen } from '../screens/DiscoveryScreen'

import { DiscoveryStackParamList } from '../types'
import { EventCategoryScreen } from '../screens/EventCategoryScreen'

const Stack = createNativeStackNavigator<DiscoveryStackParamList>()

export const DiscoveryStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Discovery"
      options={{ headerShown: false }}
      component={DiscoveryScreen}
    />
    <Stack.Screen
      options={({ route }) => ({ title: route.params.eventCategoryName })}
      name="EventCategory"
      component={EventCategoryScreen}
    />
  </Stack.Navigator>
)
