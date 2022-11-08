import { NavigationContainer } from '@react-navigation/native'

import { BottomNavigator } from './BottomNavigator'

import { useAuth } from '../../firebase'
import { StackNavigator } from './StackNavigator'

export default function RootNavigator() {
  const authenticated = useAuth()

  return (
    <NavigationContainer>
      {authenticated ? <BottomNavigator /> : <StackNavigator />}
    </NavigationContainer>
  )
}
