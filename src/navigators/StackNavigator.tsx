import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { DiscoveryScreen } from '../screens/DiscoveryScreen'
import { LoginOrRegisterScreen } from '../screens/LoginOrRegisterScreen'

export const StackNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Discovery">
        {props => <DiscoveryScreen {...props} loginBottom={true} />}
      </Stack.Screen>
      <Stack.Screen name="LoginOrRegister" component={LoginOrRegisterScreen} />
    </Stack.Navigator>
  )
}
