import { useEffect, useState } from 'react'
import { Spinner } from 'native-base'
import { FormikConfig } from 'formik'

import { FBGetEventTicketTypes, FBProcessTicketOrders } from '../firebase'

import { TicketPurchaseForm } from '../forms/TicketPurchaseForm'

import { ViewContainer } from '../atoms/ViewContainer'

import { useAppDispatch, useAppSelector } from '../hooks'

import { DiscoveryStackScreenProps, ITicketOrder, ITicketType } from '../types'
import { getErrorMessage } from '../helpers/errors'

export const TicketPurchaseScreen = ({
  navigation,
}: DiscoveryStackScreenProps<'TicketPurchase'>) => {
  const [ticketTypes, setTicketTypes] = useState<Array<ITicketType>>([])
  const { user, event } = useAppSelector(({ user, activeEvent }) => ({
    user,
    event: activeEvent.event,
  }))
  const dispatch = useAppDispatch()

  useEffect(() => {
    navigation.setOptions({
      title: event.name ? event.name : 'Purchase Tickets',
      headerBackTitle: 'Event Details',
    })
  }, [event])

  useEffect(() => {
    if (!event.category) return
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

  const handleSubmit: FormikConfig<Array<ITicketOrder>>['onSubmit'] = async (
    ticketOrders,
    { setStatus }
  ) => {
    const filledTicketOrders = ticketOrders.filter(({ amount }) => amount > 0)

    if (filledTicketOrders.length === 0)
      return setStatus('You must select at least one ticket')

    try {
      await FBProcessTicketOrders(filledTicketOrders, dispatch)

      navigation.navigate('TicketConfirmation')
    } catch (e) {
      setStatus(getErrorMessage(e))
    }
  }

  if (ticketTypes.length === 0) return <Spinner size="lg" />

  const initialValues: Array<ITicketOrder> = ticketTypes.map(
    ({
      id,
      eventCategory,
      eventId,
      minTicketsPerOrder,
      maxTicketsPerOrder,
    }) => ({
      userId: user.uid,
      userName: user.details.username,
      ticketTypeId: id,
      eventId,
      eventCategory,
      minTicketsPerOrder,
      maxTicketsPerOrder,
      amount: 0,
    })
  )

  return (
    <ViewContainer alignItems="stretch">
      <TicketPurchaseForm
        onSubmit={handleSubmit}
        eventName={event.name}
        eventStart={event.startDateTime}
        eventEnd={event.endDateTime}
        ticketTypes={ticketTypes}
        initialValues={initialValues}
      />
    </ViewContainer>
  )
}
