import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { LandingScreen } from '../screens/LandingScreen'
import { QuestionnaireScreen } from '../screens/QuestionnaireScreen'
import { DashboardScreen } from '../screens/DashboardScreen'
import { RootStackParamList } from '../types'
import { DashboardHeader } from '../headers/DashboardHeader'
import { SigninLoginScreen } from '../screens/SigninLoginScreen'

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
          options={props => ({
            header: () => <DashboardHeader {...props} />,
          })}
          component={DashboardScreen}
        />
        <Stack.Screen
          name="SigninLogin"
          options={{ headerShown: false }}
          component={SigninLoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
