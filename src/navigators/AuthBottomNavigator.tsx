import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import { IconButton, useTheme } from 'native-base'

import { CompanyStackNavigator } from './CompanyNavigator'
import { DiscoveryStackNavigator } from './DiscoveryStackNavigator'
import { UserTicketsStackNavigator } from './UserTicketsNavigator'

import { SearchScreen } from '../screens/SearchScreen'
import { SearchFilterScreen } from '../screens/SearchFilterScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import {
  ChevronLeftIcon,
  CompanyIcon,
  HomeIcon,
  SearchIcon,
  SlidersIcon,
  UserIcon,
} from '../icons'

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
        tabBarActiveTintColor: colors.tertiary[400],
        tabBarInactiveTintColor: colors.text[900],
        headerTitleStyle: {
          fontSize: fontSizes['xl'],
          fontWeight: '400',
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIconProps => <HomeIcon {...tabBarIconProps} />,
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
          tabBarIcon: tabBarIconProps => <SearchIcon {...tabBarIconProps} />,
        })}
        name="Search"
        component={SearchScreen}
      />
      <Tab.Screen
        options={{
          title: 'Tickets',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="ticket" color={color} size={size} />
          ),
        }}
        name="UserTicketsStack"
        component={UserTicketsStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIconProps => <UserIcon {...tabBarIconProps} />,
          headerShown: true,
        }}
        name="Profile"
        component={ProfileScreen}
      />
      {hasCompany && (
        <Tab.Screen
          options={{
            tabBarIcon: tabBarIconProps => <CompanyIcon {...tabBarIconProps} />,
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
