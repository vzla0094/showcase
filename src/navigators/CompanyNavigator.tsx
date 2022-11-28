import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { CompanyDashboardScreen } from '../screens/CompanyDashboardScreen'
import { CompanyDetailsScreen } from '../screens/CompanyDetailsScreen'
import { CreateEventScreen } from '../screens/CreateEventScreen'

import { CompanyStackParamList } from '../types'
import { FontAwesome } from '@expo/vector-icons'
import { IconButton } from 'native-base'

const Stack = createNativeStackNavigator<CompanyStackParamList>()

export const CompanyStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        options={({ navigation }) => ({
          headerBackVisible: false,
          headerRight: () => (
            <IconButton
              onPress={() => navigation.navigate('CompanyDetails')}
              _icon={{
                as: FontAwesome,
                name: 'gear',
              }}
            />
          ),
        })}
        component={CompanyDashboardScreen}
      />
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
      <Stack.Screen
        options={({ navigation }) => ({
          title: 'Company details',
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.navigate('Dashboard')}
              _icon={{
                as: FontAwesome,
                name: 'chevron-left',
              }}
            />
          ),
        })}
        name="CompanyDetails"
        component={CompanyDetailsScreen}
      />
    </Stack.Navigator>
  )
}
