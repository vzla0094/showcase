import { NavigationContainer } from '@react-navigation/native'

import { AuthBottomNavigator } from './AuthBottomNavigator'
import { UnAuthStackNavigator } from './UnAuthStackNavigator'

import { useAuth, useEvents } from '../../firebase'

export default function RootNavigator() {
  const authenticated = useAuth()
  useEvents()

  return (
    <NavigationContainer>
      {authenticated ? <AuthBottomNavigator /> : <UnAuthStackNavigator />}
    </NavigationContainer>
  )
}
