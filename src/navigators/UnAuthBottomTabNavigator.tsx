import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import { IconButton } from 'native-base'

import { DiscoveryStackNavigator } from './DiscoveryStackNavigator'
import { LoginOrRegisterScreen } from '../screens/LoginOrRegisterScreen'
import { UnAuthBottomTabBar } from '../components/UnAuthBottomTabBar'

import { UnAuthBottomTabParamList } from '../types'

const Tab = createBottomTabNavigator<UnAuthBottomTabParamList>()

export const UnAuthBottomTabNavigator = () => (
  <Tab.Navigator tabBar={props => <UnAuthBottomTabBar {...props} />}>
    <Tab.Screen
      options={{ headerShown: false }}
      name="DiscoveryStack"
      component={DiscoveryStackNavigator}
    />

    <Tab.Screen
      options={({ navigation }) => ({
        headerLeft: () => (
          <IconButton
            onPress={() => navigation.goBack()}
            _icon={{
              as: FontAwesome,
              name: 'chevron-left',
            }}
          />
        ),
        tabBarStyle: { display: 'none' },
      })}
      name="LoginOrRegister"
      component={LoginOrRegisterScreen}
    />
  </Tab.Navigator>
)
