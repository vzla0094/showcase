import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { DiscoveryScreen } from '../screens/DiscoveryScreen'
import { LoginBottomNavigation } from '../components/LoginBottomNavigation'
import { LoginOrRegisterScreen } from '../screens/LoginOrRegisterScreen'

export const StackNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Discovery">
        {({ navigation }) => {
          return (
            <>
              <DiscoveryScreen />
              <LoginBottomNavigation navigation={navigation} />
            </>
          )
        }}
      </Stack.Screen>
      <Stack.Screen name="LoginOrRegister" component={LoginOrRegisterScreen} />
    </Stack.Navigator>
  )
}
