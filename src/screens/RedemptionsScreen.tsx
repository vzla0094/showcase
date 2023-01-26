import { Fab } from 'native-base'
import { useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { AntDesign } from '@expo/vector-icons'

import { useAppDispatch, useAppSelector } from '../hooks'
import { redeemTicket } from '../redux/slices/company'

import { TicketList } from '../molecules/TicketList'
import { RedeemTicketDialog } from '../molecules/RedeemTicketDialog'

import { CompanyStackScreenProps, emptyTicket, ITicket } from '../types'

export const RedemptionsScreen = ({
  route,
  navigation,
}: CompanyStackScreenProps<'Redemptions'>) => {
  const dispatch = useAppDispatch()
  const tickets = useAppSelector(({ company }) =>
    company.activeEvent.tickets.filter(
      ticket => ticket.ticketTypeId === route.params.id
    )
  )

  // Dialog related logic
  const cancelRef = useRef(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<ITicket>(emptyTicket)
  const redeemHandler = () => {
    dispatch(redeemTicket(selectedTicket))
    setIsDialogOpen(false)
  }

  // TabView related logic
  const [tabIndex, setTabIndex] = useState<number>(0)
  const routes = [
    { key: 'redeemed', title: 'Redeemed' },
    { key: 'reserved', title: 'Reserved' },
  ]

  // ticketList related logic
  const reservedTickets: ITicket[] = []
  const redeemedTickets: ITicket[] = []
  tickets.forEach(ticket => {
    if (ticket.state === 'reserved') reservedTickets.push(ticket)
    if (ticket.state === 'redeemed') redeemedTickets.push(ticket)
  })
  const handleTicketCardPress = (ticket: ITicket) => {
    setSelectedTicket(ticket)
    setIsDialogOpen(true)
  }

  return (
    <>
      <TabView
        navigationState={{ index: tabIndex, routes }}
        onIndexChange={setTabIndex}
        renderScene={SceneMap({
          redeemed: () => (
            <TicketList
              onTicketCardPress={handleTicketCardPress}
              ticketList={reservedTickets}
            />
          ),
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
      <RedeemTicketDialog
        leastDestructiveRef={cancelRef}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onRedeem={redeemHandler}
      />
    </>
  )
}
