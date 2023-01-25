import { FlatList } from 'native-base'
import { TicketTypeCard } from '../atoms/TicketTypeCard'
import { useAppSelector } from '../hooks'
import { CompanyStackScreenProps } from '../types'

export const TicketTypesScreen = ({
  navigation,
}: CompanyStackScreenProps<'TicketTypes'>) => {
  const { ticketTypes } = useAppSelector(({ company }) => company.activeEvent)
  return (
    <FlatList
      data={ticketTypes}
      renderItem={({ item: { id, name, sold, quantity, price } }) => (
        <TicketTypeCard
          onPress={() => navigation.navigate('Redemptions', { id })}
          name={name}
          sold={sold}
          quantity={quantity}
          price={price}
        />
      )}
    />
  )
}
