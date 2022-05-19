import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { LandingScreen } from '../screens/LandingScreen'
import { QuestionnaireScreen } from '../screens/QuestionnaireScreen'
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
        <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
