import { Button } from 'native-base'

import { TicketTypeCard } from '../atoms/TicketTypeCard'
import { ViewContainer } from '../atoms/ViewContainer'
import { useAppSelector } from '../hooks'

import { CompanyStackScreenProps } from '../types'

export const EventTicketTypesScreen = ({
  navigation,
}: CompanyStackScreenProps<'EventTickets'>) => {
  const event = useAppSelector(({ user }) => user.activeEvent)

  return (
    <ViewContainer alignItems="stretch">
      <TicketTypeCard
        onPress={() =>
          navigation.navigate('CreateEditTicket', { id: '1dummyTicketTypeId' })
        }
        name="dummy name"
        sold={20}
        quantity={50}
        price={0}
      />
      <Button onPress={() => navigation.navigate('CreateEditTicket')}>
        Create new ticket type
      </Button>
    </ViewContainer>
  )
}
