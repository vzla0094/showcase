import { FlatList, View } from 'native-base'
import { ITicket } from '../types'
import { TicketCard } from '../atoms/TicketCard'

interface TicketListProps {
  ticketList: ITicket[]
  onTicketCardPress?: (ticket: ITicket) => void
}

export const TicketList = ({
  ticketList,
  onTicketCardPress,
}: TicketListProps) => (
  <View flex={1}>
    <FlatList
      data={ticketList}
      ListEmptyComponent={<TicketCard text="No tickets" />}
      renderItem={({ item }) => (
        <TicketCard
          onPress={onTicketCardPress && (() => onTicketCardPress(item))}
          text={item.userName}
        />
      )}
    />
  </View>
)
