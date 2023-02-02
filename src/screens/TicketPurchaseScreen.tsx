import { useEffect, useState } from 'react'
import { Spinner } from 'native-base'
import { FormikConfig } from 'formik'

import { FBGetEventTicketTypes, FBAddTicketsFromTicketOrder } from '../firebase'

import { TicketPurchaseForm } from '../forms/TicketPurchaseForm'

import { ViewContainer } from '../atoms/ViewContainer'

import { useAppSelector } from '../hooks'

import { DiscoveryStackScreenProps, ITicketOrder, ITicketType } from '../types'

export const TicketPurchaseScreen = ({
  navigation,
}: DiscoveryStackScreenProps<'TicketPurchase'>) => {
  const [ticketTypes, setTicketTypes] = useState<Array<ITicketType>>([])
  const user = useAppSelector(({ user }) => user)
  const { activeEvent } = user

  useEffect(() => {
    navigation.setOptions({
      title: activeEvent.name ? activeEvent.name : 'Purchase Tickets',
      headerBackTitle: 'Event Details',
    })
  }, [activeEvent])

  useEffect(() => {
    const getTicketTypes = async () => {
      const dbTicketTypes = await FBGetEventTicketTypes(
        activeEvent.id,
        activeEvent.category,
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
  }, [activeEvent])

  const handleSubmit: FormikConfig<Array<ITicketOrder>>['onSubmit'] = async (
    ticketOrders,
    { setStatus }
  ) => {
    const filledTicketOrders = ticketOrders.filter(({ amount }) => amount > 0)

    if (filledTicketOrders.length === 0) return setStatus('empty')

    console.log(filledTicketOrders)

    await FBAddTicketsFromTicketOrder(filledTicketOrders)

    navigation.navigate('TicketConfirmation')
  }

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
      {ticketTypes.length === 0 ? (
        <Spinner size="lg" />
      ) : (
        <TicketPurchaseForm
          onSubmit={handleSubmit}
          eventName={activeEvent.name}
          eventStart={activeEvent.startDateTime}
          eventEnd={activeEvent.endDateTime}
          ticketTypes={ticketTypes}
          initialValues={initialValues}
        />
      )}
    </ViewContainer>
  )
}
