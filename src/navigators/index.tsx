import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { LandingScreen } from '../screens/LandingScreen'
import { QuestionnaireScreen } from '../screens/QuestionnaireScreen'
import { DiscoveryScreen } from '../screens/DiscoveryScreen'
import { RootStackParamList } from '../types'
import { DashboardHeader } from '../headers/DashboardHeader'
import { LoginOrRegisterScreen } from '../screens/LoginOrRegisterScreen'
import { useAuth } from '../../firebase'

export default function RootNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  const authenticated = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          options={{ headerShown: false }}
          component={LandingScreen}
        />
        <Stack.Screen
          name="Questionnaire"
          options={{ headerShown: false }}
          component={QuestionnaireScreen}
        />
        <Stack.Screen
          name="Discovery"
          options={props => ({
            headerShown: !authenticated,
            header: () => <DashboardHeader {...props} />,
          })}
          component={DiscoveryScreen}
        />
        <Stack.Screen
          name="LoginOrRegister"
          options={{ headerShown: false }}
          component={LoginOrRegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
