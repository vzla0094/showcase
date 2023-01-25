import { FlatList, View } from 'native-base'
import { ITicket } from '../types'
import { TicketCard } from '../atoms/TicketCard'

interface TicketListProps {
  ticketList: ITicket[]
}

export const TicketList = ({ ticketList }: TicketListProps) => (
  <View flex={1}>
    <FlatList
      data={ticketList}
      ListEmptyComponent={<TicketCard text="No tickets" />}
      renderItem={({ item }) => <TicketCard text={item.userName} />}
    />
  </View>
)
