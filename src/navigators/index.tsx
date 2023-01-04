import { NavigationContainer } from '@react-navigation/native'

import { AuthBottomNavigator } from './AuthBottomNavigator'
import { UnAuthBottomTabNavigator } from './UnAuthBottomTabNavigator'

import { useAuth } from '../firebase'

export default function RootNavigator() {
  const { authenticated, loading } = useAuth()

  if (loading) return null

  return (
    <NavigationContainer>
      {authenticated ? <AuthBottomNavigator /> : <UnAuthBottomTabNavigator />}
    </NavigationContainer>
  )
}
