import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'native-base'

import { AuthBottomNavigator } from './AuthBottomNavigator'
import { UnAuthBottomTabNavigator } from './UnAuthBottomTabNavigator'

import { useAuth } from '../firebase'

export default function RootNavigator() {
  const { authenticated, loading } = useAuth()
  const theme = useTheme()

  if (loading) return null

  return (
    <NavigationContainer
      theme={{
        // override default navigation theme styles to reflect native base theme
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          text: theme.colors.lightText,
          background: theme.colors.primary[900],
        },
      }}
    >
      {authenticated ? <AuthBottomNavigator /> : <UnAuthBottomTabNavigator />}
    </NavigationContainer>
  )
}
