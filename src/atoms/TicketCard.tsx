import { View, Text } from 'native-base'

interface TicketCardProps {
  text: string
}

export const TicketCard = ({ text }: TicketCardProps) => (
  <View
    flex={1}
    p={4}
    borderColor="gray.300"
    borderBottomWidth={1}
    bgColor="white"
  >
    <Text fontSize={24}>{text}</Text>
  </View>
)
