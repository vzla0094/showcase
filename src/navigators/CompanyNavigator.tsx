import { IconButton, useTheme } from 'native-base'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CaretLeft, Gear } from 'phosphor-react-native'

import { CompanyDashboardScreen } from '../screens/CompanyDashboardScreen'
import { CompanyDetailsScreen } from '../screens/CompanyDetailsScreen'
import { CompanyEventScreen } from '../screens/CompanyEventScreen'
import { EventTicketTypesScreen } from '../screens/EventTicketTypesScreen'
import { CreateEditTicketTypeScreen } from '../screens/CreateEditTicketTypeScreen'
import { TicketTypesScreen } from '../screens/TicketTypesScreen'
import { RedeemTicketScreen } from '../screens/RedeemTicketScreen'
import { RedemptionsScreen } from '../screens/RedemptionsScreen'

import { CompanyStackParamList, CompanyStackScreenProps } from '../types'

const Stack = createNativeStackNavigator<CompanyStackParamList>()

export const CompanyStackNavigator = () => {
  const { fontSizes, colors } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTitleStyle: {
          fontSize: fontSizes['xl'],
          fontWeight: '400',
        },
        headerLeft: () => (
          <IconButton
            onPress={() => navigation.goBack()}
            icon={<CaretLeft color={colors.lightText} size={24} />}
          />
        ),
      })}
    >
      <Stack.Screen
        name="CompanyDashboard"
        options={({
          navigation,
        }: CompanyStackScreenProps<'CompanyDashboard'>) => ({
          title: '',
          headerLeft: undefined,
          headerRight: () => (
            <IconButton
              onPress={() => navigation.navigate('CompanyDetails')}
              icon={<Gear color={colors.lightText} size={24} />}
            />
          ),
        })}
        component={CompanyDashboardScreen}
      />
      <Stack.Screen
        options={{
          title: 'Company details',
        }}
        name="CompanyDetails"
        component={CompanyDetailsScreen}
      />
      <Stack.Screen
        options={{
          title: '',
        }}
        name="Event"
        component={CompanyEventScreen}
      />
      <Stack.Screen
        options={{
          title: 'Event ticket types',
        }}
        name="EventTickets"
        component={EventTicketTypesScreen}
      />
      <Stack.Screen
        options={{
          title: '',
        }}
        name="CreateEditTicketType"
        component={CreateEditTicketTypeScreen}
      />
      <Stack.Screen
        name="TicketTypes"
        options={{
          title: 'Ticket types',
        }}
        component={TicketTypesScreen}
      />
      <Stack.Screen
        options={{
          title: 'Check in',
        }}
        name="Redemptions"
        component={RedemptionsScreen}
      />
      <Stack.Screen
        options={{
          title: 'Redeem ticket',
        }}
        name="RedeemTicket"
        component={RedeemTicketScreen}
      />
    </Stack.Navigator>
  )
}
