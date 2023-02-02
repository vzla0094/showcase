import { FlatList } from 'native-base'
import { useEffect, useState } from 'react'
import { FBGetEventTicketTypes, FBGetUserEventTickets } from '../firebase'
import { useAppSelector } from '../hooks'
import { Ticket } from '../molecules/Ticket'
import { ICompanyActiveEvent, ITicket, ITicketType } from '../types'

export const UserEventTicketsScreen = () => {
  const [tickets, setTickets] = useState<Array<ITicket>>([])
  const [ticketTypes, setTicketTypes] = useState<Array<ITicketType>>([])
  const user = useAppSelector(({ user }) => user)
  const activeEvent = user.activeEvent

  useEffect(() => {
    const fetchData = async () => {
      const tickets = await FBGetUserEventTickets(
        activeEvent.id,
        activeEvent.category,
        user.uid
      )
      const ticketTypes = await FBGetEventTicketTypes(
        activeEvent.id,
        activeEvent.category
      )
      setTickets(tickets)
      setTicketTypes(ticketTypes)
    }
    fetchData()
  }, [])

  const event: ICompanyActiveEvent = {
    ...activeEvent,
    tickets: tickets,
    ticketTypes: ticketTypes,
  }
  return (
    <FlatList
      data={tickets}
      renderItem={ticket => <Ticket ticket={ticket.item} event={event} />}
    />
  )
}
