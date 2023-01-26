import { Text, IPressableProps, Pressable } from 'native-base'

interface TicketCardProps extends IPressableProps {
  text: string
}

export const TicketCard = ({ text, onPress, ...props }: TicketCardProps) => (
  <Pressable
    flex={1}
    p={4}
    borderColor="gray.300"
    borderBottomWidth={1}
    bgColor="white"
    onPress={onPress}
    {...props}
  >
    <Text fontSize={24}>{text}</Text>
  </Pressable>
)
