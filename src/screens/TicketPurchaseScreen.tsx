import { useEffect, useState } from 'react'
import { Text, Box, Button, FlatList, Heading, Spinner } from 'native-base'

import { ViewContainer } from '../atoms/ViewContainer'
import { TicketOrderCard } from '../molecules/TicketOrderCard'
import { useAppSelector } from '../hooks'
import { FBGetEventTicketTypes } from '../firebase'
import { DiscoveryStackScreenProps, ITicketType } from '../types'

export const TicketPurchaseScreen = ({
  navigation,
}: DiscoveryStackScreenProps<'TicketPurchase'>) => {
  const [total, setTotal] = useState('0.00')
  const [tickets, setTickets] = useState<Record<string, number>>({})
  const [ticketTypes, setTicketTypes] = useState<Array<ITicketType>>([])
  const { event } = useAppSelector(({ user: { activeEvent } }) => ({
    event: activeEvent,
  }))

  useEffect(() => {
    navigation.setOptions({
      title: event.name ? event.name : 'Purchase Tickets',
      headerBackTitle: 'Event Details',
    })
  }, [event])

  useEffect(() => {
    const getTicketTypes = async () => {
      const dbTicketTypes = await FBGetEventTicketTypes(
        event.id,
        event.category,
        [
          {
            key: 'available',
            operator: '>',
            value: 0,
          },
        ]
      )

      setTicketTypes(dbTicketTypes)
    }

    getTicketTypes()
  }, [event])

  const addTicket = (id: string, value: number) => {
    const newTickets = { ...tickets }
    newTickets[`${id}`] = value // Set the new value

    let newTotal = 0

    Object.keys(newTickets).forEach(keyId => {
      const ticketType = ticketTypes.find(ticket => ticket.id === keyId)
      const price = ticketType?.price ?? 0
      const value = newTickets[`${keyId}`]

      newTotal += price * value
    })

    setTotal(newTotal.toFixed(2))
    setTickets(newTickets)
  }

  const handleConfirm = () => {
    console.log(total)
  }

  return (
    <ViewContainer justifyContent="space-around">
      <Box flex={1} width="full">
        <Box mb={5} alignItems="center">
          <Heading>{event.name}</Heading>
          {event.startDateTime || event.endDateTime ? (
            <Heading size="md">
              {event.startDateTime} - {event.endDateTime}
            </Heading>
          ) : null}
        </Box>
        <Box>
          {ticketTypes.length === 0 ? (
            <Spinner size="lg" />
          ) : (
            <FlatList
              data={ticketTypes}
              keyExtractor={ticketType => ticketType.id}
              renderItem={({ item: { id, name, description, price } }) => (
                <TicketOrderCard
                  onPress={value => addTicket(id, value)}
                  value={0}
                  name={name}
                  title={price ? `$${price}` : 'Free'}
                  description={description}
                />
              )}
            />
          )}
        </Box>
      </Box>
      <Box width="full" mb={2}>
        <Text fontSize={18} fontWeight="700" textAlign="right">
          Total: ${total}
        </Text>
        <Button onPress={handleConfirm}>Confirm</Button>
      </Box>
    </ViewContainer>
  )
}
