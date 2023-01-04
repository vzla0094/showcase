import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import { IconButton } from 'native-base'

import { CompanyStackNavigator } from './CompanyNavigator'
import { DiscoveryStackNavigator } from './DiscoveryStackNavigator'

import { SearchScreen } from '../screens/SearchScreen'
import { SearchFilterScreen } from '../screens/SearchFilterScreen'
import { ProfileScreen } from '../screens/ProfileScreen'

import { useAppSelector } from '../hooks'

import { AuthBottomTabParamList, AuthBottomTabScreenProps } from '../types'

const Tab = createBottomTabNavigator<AuthBottomTabParamList>()

export const AuthBottomNavigator = () => {
  const hasCompany = useAppSelector(state => Boolean(state.company.companyId))

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
          title: 'Discovery',
        }}
        name="DiscoveryStack"
        component={DiscoveryStackNavigator}
      />
      <Tab.Screen
        options={({ navigation }: AuthBottomTabScreenProps<'Search'>) => ({
          headerShown: true,
          headerRight: () => (
            <IconButton
              onPress={() => navigation.navigate('Filter')}
              _icon={{
                as: FontAwesome,
                name: 'sliders',
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size} />
          ),
        })}
        name="Search"
        component={SearchScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
      {hasCompany && (
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="building" color={color} size={size} />
            ),
            title: 'Company',
          }}
          name="CompanyStack"
          component={CompanyStackNavigator}
          listeners={({
            navigation,
          }: AuthBottomTabScreenProps<'CompanyStack'>) => ({
            tabPress: e => {
              e.preventDefault()
              navigation.navigate('CompanyStack', {
                screen: 'CompanyDashboard',
              })
            },
          })}
        />
      )}
      <Tab.Screen
        options={({ navigation }: AuthBottomTabScreenProps<'Filter'>) => ({
          tabBarButton: () => null,
          headerShown: true,
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.navigate('Search')}
              _icon={{
                as: FontAwesome,
                name: 'chevron-left',
              }}
            />
          ),
        })}
        name="Filter"
        component={SearchFilterScreen}
      />
    </Tab.Navigator>
  )
}
