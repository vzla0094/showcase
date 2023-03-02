import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { IconButton, useTheme } from 'native-base'
import {
  House,
  MagnifyingGlass,
  Storefront,
  Ticket,
  User,
} from 'phosphor-react-native'

import { CompanyStackNavigator } from './CompanyNavigator'
import { DiscoveryStackNavigator } from './DiscoveryStackNavigator'
import { UserTicketsStackNavigator } from './UserTicketsNavigator'

import { SearchScreen } from '../screens/SearchScreen'
import { SearchFilterScreen } from '../screens/SearchFilterScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { ChevronLeftIcon, SlidersIcon } from '../icons'

import { useAppSelector } from '../hooks'

import { AuthBottomTabParamList, AuthBottomTabScreenProps } from '../types'

const Tab = createBottomTabNavigator<AuthBottomTabParamList>()

export const AuthBottomNavigator = () => {
  const hasCompany = useAppSelector(state => Boolean(state.company.companyId))
  const { colors, fontSizes } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTitleStyle: {
          fontSize: fontSizes['xl'],
          fontWeight: '400',
        },
        tabBarActiveTintColor: colors.tertiary[400],
        tabBarInactiveTintColor: colors.darkText,
        tabBarStyle: {
          height: 80,
          paddingBottom: 0,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          flex: 1,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
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
              icon={<SlidersIcon color={colors.white} size={25} />}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MagnifyingGlass color={color} size={size} />
          ),
        })}
        name="Search"
        component={SearchScreen}
      />
      <Tab.Screen
        options={{
          title: 'Tickets',
          tabBarIcon: ({ color, size }) => <Ticket color={color} size={size} />,
        }}
        name="UserTicketsStack"
        component={UserTicketsStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          headerShown: true,
        }}
        name="Profile"
        component={ProfileScreen}
      />
      {hasCompany && (
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Storefront color={color} size={size} />
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
              icon={<ChevronLeftIcon color={colors.white} size={25} />}
            />
          ),
        })}
        name="Filter"
        component={SearchFilterScreen}
      />
    </Tab.Navigator>
  )
}
