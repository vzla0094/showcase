import { FlatList } from 'native-base'
import { useEffect, useState } from 'react'
import { FBGetEventTicketTypes, FBGetUserEventTickets } from '../firebase'
import { useAppSelector } from '../hooks'
import { Ticket } from '../molecules/Ticket'
import { ITicket, ITicketType } from '../types'

export const UserEventTicketsScreen = () => {
  const [tickets, setTickets] = useState<Array<ITicket>>([])
  const [ticketTypes, setTicketTypes] = useState<Array<ITicketType>>([])
  const { user, event } = useAppSelector(({ user, activeEvent }) => ({
    user,
    event: activeEvent.event,
  }))

  useEffect(() => {
    const fetchData = async () => {
      const tickets = await FBGetUserEventTickets(
        event.id,
        event.category,
        user.uid
      )
      const ticketTypes = await FBGetEventTicketTypes(event.id, event.category)
      setTickets(tickets)
      setTicketTypes(ticketTypes)
    }
    fetchData()
  }, [])

  return (
    <FlatList
      data={tickets}
      renderItem={ticket => (
        <Ticket
          ticket={ticket.item}
          activeEvent={{
            event,
            tickets,
            ticketTypes,
          }}
        />
      )}
    />
  )
}
