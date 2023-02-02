import { useEffect, useState } from 'react'
import { Spinner } from 'native-base'
import { FormikConfig } from 'formik'

import { FBGetEventTicketTypes } from '../firebase'

import { TicketPurchaseForm } from '../forms/TicketPurchaseForm'

import { ViewContainer } from '../atoms/ViewContainer'

import { useAppSelector } from '../hooks'

import { DiscoveryStackScreenProps, ITicketOrder, ITicketType } from '../types'

export const TicketPurchaseScreen = ({
  navigation,
}: DiscoveryStackScreenProps<'TicketPurchase'>) => {
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

  const handleSubmit: FormikConfig<Array<ITicketOrder>>['onSubmit'] = (
    ticketOrders,
    { setStatus }
  ) => {
    const filledTicketOrders = ticketOrders.filter(({ amount }) => amount > 0)

    if (filledTicketOrders.length === 0) return setStatus('empty')

    console.log(filledTicketOrders)

    navigation.navigate('TicketConfirmation')
  }

  return (
    <ViewContainer alignItems="stretch">
      {ticketTypes.length === 0 ? (
        <Spinner size="lg" />
      ) : (
        <TicketPurchaseForm
          onSubmit={handleSubmit}
          eventName={event.name}
          eventStart={event.startDateTime}
          eventEnd={event.endDateTime}
          ticketTypes={ticketTypes}
        />
      )}
    </ViewContainer>
  )
}
