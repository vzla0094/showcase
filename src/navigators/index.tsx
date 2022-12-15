import { NavigationContainer } from '@react-navigation/native'

import { AuthBottomNavigator } from './AuthBottomNavigator'
import { UnAuthStackNavigator } from './UnAuthStackNavigator'

import { useAuth } from '../../firebase'

export default function RootNavigator() {
  const authenticated = useAuth()

  return (
    <NavigationContainer>
      {authenticated ? <AuthBottomNavigator /> : <UnAuthStackNavigator />}
    </NavigationContainer>
  )
}
