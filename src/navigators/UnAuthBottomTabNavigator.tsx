import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { IconButton, Image, useTheme } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'

import { DiscoveryStackNavigator } from './DiscoveryStackNavigator'
import { LoginOrRegisterScreen } from '../screens/LoginOrRegisterScreen'
import { UnAuthBottomTabBar } from '../components/UnAuthBottomTabBar'

import { UnAuthBottomTabParamList } from '../types'

const Tab = createBottomTabNavigator<UnAuthBottomTabParamList>()

export const UnAuthBottomTabNavigator = () => {
  const { fontSizes, colors } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTitleStyle: {
          fontSize: fontSizes['xl'],
          fontWeight: '400',
        },
      }}
      tabBar={props => <UnAuthBottomTabBar {...props} />}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="DiscoveryStack"
        component={DiscoveryStackNavigator}
      />

      <Tab.Screen
        options={({ navigation }) => ({
          headerBackground: () => (
            <Image
              alt="logo-light"
              size="2xl"
              resizeMode="contain"
              alignSelf="center"
              source={require('../../assets/logo-light.png')}
            />
          ),
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.goBack()}
              icon={<CaretLeft color={colors.lightText} size={24} />}
            />
          ),
          headerStyle: {
            height: 200,
          },
          headerTitle: '',
          tabBarStyle: { display: 'none' },
        })}
        name="LoginOrRegister"
        component={LoginOrRegisterScreen}
      />
    </Tab.Navigator>
  )
}
