import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { UserTicketsStackParamList } from '../types'
import { UserTicketsScreen } from '../screens/UserTicketsScreen'
import { UserEventTicketsScreen } from '../screens/UserEventTicketsScreen'

const Stack = createNativeStackNavigator<UserTicketsStackParamList>()

export const UserTicketsStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'transparent',
      },
    }}
  >
    <Stack.Screen name="UserTickets" component={UserTicketsScreen} />
    <Stack.Screen name="UserEventTickets" component={UserEventTicketsScreen} />
  </Stack.Navigator>
)
