import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RootStackParamList } from '../types'
import { FontAwesome } from '@expo/vector-icons'
import { DiscoveryScreen } from '../screens/DiscoveryScreen'
import { SearchScreen } from '../screens/SearchScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { PromotionScreen } from '../screens/PromotionScreen'

const Tab = createBottomTabNavigator<RootStackParamList>()

export const BottomNavigator = () => {
  const hasCompany = true // TODO: wire up to Profile if the user filled company details

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
              <FontAwesome name="tags" color={color} size={size} />
            ),
          }}
          name="Promotion"
          component={PromotionScreen}
        />
      )}
    </Tab.Navigator>
  )
}
