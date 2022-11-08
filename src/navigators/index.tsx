import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { DiscoveryScreen } from '../screens/DiscoveryScreen'
import { RootStackParamList } from '../types'
import { LoginOrRegisterScreen } from '../screens/LoginOrRegisterScreen'
import { useAuth } from '../../firebase'
import { LoginBottomNavigation } from '../components/LoginBottomNavigation'
import { SearchScreen } from '../screens/SearchScreen'
import { ProfileScreen } from '../screens/Profile'
import { SettingsScreen } from '../screens/SettingsScreen'

export default function RootNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  const Tab = createBottomTabNavigator<RootStackParamList>()
  const authenticated = useAuth()

  return (
    <NavigationContainer>
      {authenticated ? (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Discovery" component={DiscoveryScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Discovery">
            {({ navigation }) => {
              return (
                <>
                  <DiscoveryScreen />
                  <LoginBottomNavigation navigation={navigation} />
                </>
              )
            }}
          </Tab.Screen>
          <Tab.Screen
            name="LoginOrRegister"
            component={LoginOrRegisterScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
