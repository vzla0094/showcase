import { Fab } from 'native-base'
import { useState } from 'react'
import { Dimensions } from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import { AntDesign } from '@expo/vector-icons'

import { TicketList } from '../molecules/TIcketList'
import { useAppSelector } from '../hooks'
import { CompanyStackScreenProps, ITicket } from '../types'

export const RedemptionsScreen = ({
  route,
  navigation,
}: CompanyStackScreenProps<'Redemptions'>) => {
  const tickets = useAppSelector(({ company }) =>
    company.activeEvent.tickets.filter(
      ticket => ticket.ticketTypeId === route.params.id
    )
  )
  const [index, setIndex] = useState<number>(0)
  const routes = [
    { key: 'redeem', title: 'Redeem' },
    { key: 'reserved', title: 'Reserved' },
  ]
  const reservedTickets: ITicket[] = []
  const redeemedTickets: ITicket[] = []

  tickets.forEach(ticket => {
    if (ticket.state === 'reserved') reservedTickets.push(ticket)
    if (ticket.state === 'redeemed') redeemedTickets.push(ticket)
  })

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={SceneMap({
          redeem: () => <TicketList ticketList={reservedTickets} />,
          reserved: () => <TicketList ticketList={redeemedTickets} />,
        })}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'black' }}
            style={{
              backgroundColor: 'white',
              shadowColor: 'transparent',
            }}
            labelStyle={{ color: 'black' }}
          />
        )}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
      <Fab
        renderInPortal={false}
        size="sm"
        icon={<AntDesign name="plus" size={24} color="white" />}
        onPress={() => navigation.navigate('RedeemTicket')}
      />
    </>
  )
}
