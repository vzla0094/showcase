import { IconButton } from 'native-base'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FontAwesome } from '@expo/vector-icons'

import { CompanyDashboardScreen } from '../screens/CompanyDashboardScreen'
import { CompanyDetailsScreen } from '../screens/CompanyDetailsScreen'
import { EventScreen } from '../screens/EventScreen'

import { CompanyStackParamList, CompanyStackScreenProps } from '../types'

const Stack = createNativeStackNavigator<CompanyStackParamList>()

export const CompanyStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CompanyDashboard"
        options={({
          navigation,
        }: CompanyStackScreenProps<'CompanyDashboard'>) => ({
          title: 'Company dashboard',
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
      <Stack.Screen
        options={({
          navigation,
        }: CompanyStackScreenProps<'CompanyDetails'>) => ({
          title: 'Company details',
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.navigate('CompanyDashboard')}
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
      <Stack.Screen
        options={{
          title: 'Event details',
          headerLeft: () => (
            <IconButton
              _icon={{
                as: FontAwesome,
                name: 'chevron-left',
              }}
            />
          ),
          headerRight: () => (
            <IconButton
              _icon={{
                as: FontAwesome,
                name: 'gear',
              }}
            />
          ),
        }}
        name="Event"
        component={EventScreen}
      />
    </Stack.Navigator>
  )
}
