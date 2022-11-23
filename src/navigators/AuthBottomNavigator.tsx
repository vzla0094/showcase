import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AuthBottomTabParamList } from '../types'
import { FontAwesome } from '@expo/vector-icons'
import { DiscoveryScreen } from '../screens/DiscoveryScreen'
import { SearchScreen } from '../screens/SearchScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { useAppSelector } from '../hooks'
import { CompanyStackNavigator } from './CompanyNavigator'

const Tab = createBottomTabNavigator<AuthBottomTabParamList>()

export const AuthBottomNavigator = () => {
  const hasCompany = useAppSelector(state => state.company.active)

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
        name="Discovery"
        component={DiscoveryScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size} />
          ),
        }}
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
          }}
          name="CompanyNavigator"
          component={CompanyStackNavigator}
        />
      )}
    </Tab.Navigator>
  )
}
