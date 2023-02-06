import { Button, FlatList, Box } from 'native-base'

import { TicketTypeCard } from '../atoms/TicketTypeCard'
import { ViewContainer } from '../atoms/ViewContainer'
import { useAppSelector } from '../hooks'

import { CompanyStackScreenProps } from '../types'

export const EventTicketTypesScreen = ({
  navigation,
}: CompanyStackScreenProps<'EventTickets'>) => {
  const { ticketTypes } = useAppSelector(({ activeEvent }) => activeEvent)

  return (
    <ViewContainer alignItems="stretch">
      <FlatList
        data={ticketTypes}
        ItemSeparatorComponent={() => <Box height={2} />}
        renderItem={({ item: { id, name, sold, quantity, price } }) => (
          <TicketTypeCard
            onPress={() => navigation.navigate('CreateEditTicketType', { id })}
            name={name}
            sold={sold}
            quantity={quantity}
            price={price}
          />
        )}
      />
      <Button onPress={() => navigation.navigate('CreateEditTicketType')}>
        Create new ticket type
      </Button>
    </ViewContainer>
  )
}
