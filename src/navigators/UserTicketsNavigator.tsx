import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { IconButton, useTheme } from 'native-base'

import { UserTicketsStackParamList } from '../types'
import { UserTicketsScreen } from '../screens/UserTicketsScreen'
import { UserEventTicketsScreen } from '../screens/UserEventTicketsScreen'
import { ChevronLeftIcon } from '../icons'

const Stack = createNativeStackNavigator<UserTicketsStackParamList>()

export const UserTicketsStackNavigator = () => {
  const { fontSizes, colors } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTitleStyle: {
          fontSize: fontSizes['xl'],
          fontWeight: '400',
        },
      }}
    >
      <Stack.Screen name="UserTickets" component={UserTicketsScreen} />
      <Stack.Screen
        options={({ navigation }) => ({
          title: 'Event Tickets',
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.goBack()}
              icon={<ChevronLeftIcon color={colors.white} size={25} />}
            />
          ),
        })}
        name="UserEventTickets"
        component={UserEventTicketsScreen}
      />
    </Stack.Navigator>
  )
}
