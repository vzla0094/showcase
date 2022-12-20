import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { DiscoveryScreen } from '../screens/DiscoveryScreen'
import { LoginOrRegisterScreen } from '../screens/LoginOrRegisterScreen'

import { UnAuthStackParamList } from '../types'

const Stack = createNativeStackNavigator<UnAuthStackParamList>()

export const UnAuthStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Discovery">
      {props => <DiscoveryScreen {...props} loginBottom={true} />}
    </Stack.Screen>
    <Stack.Screen name="LoginOrRegister" component={LoginOrRegisterScreen} />
  </Stack.Navigator>
)
