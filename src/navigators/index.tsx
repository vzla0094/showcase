import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { LandingScreen } from '../screens/LandingScreen'
import { QuestionnaireScreen } from '../screens/QuestionnaireScreen'
import { DashboardScreen } from '../screens/DashboardScreen'
import { RootStackParamList } from '../types'

export default function RootNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>()

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
          name="Dashboard"
          options={{ headerShown: false }}
          component={DashboardScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
