import { NavigationContainer } from '@react-navigation/native'

import { AuthBottomNavigator } from './AuthBottomNavigator'

import { useAuth } from '../../firebase'
import { UnAuthStackNavigator } from './UnAuthStackNavigator'

export default function RootNavigator() {
  const authenticated = useAuth()

  return (
    <NavigationContainer>
      {authenticated ? <AuthBottomNavigator /> : <UnAuthStackNavigator />}
    </NavigationContainer>
  )
}
