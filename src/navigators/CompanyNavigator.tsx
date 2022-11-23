import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CompanyStackParamList } from '../types'
import { CompanyScreen } from '../screens/CompanyScreen'
import { CreateEventScreen } from '../screens/CreateEventScreen'

const Stack = createNativeStackNavigator<CompanyStackParamList>()

export const CompanyStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Company" component={CompanyScreen} />
    <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
  </Stack.Navigator>
)
