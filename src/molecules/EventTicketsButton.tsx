import { Heading, Pressable, IPressableProps, Text } from 'native-base'

interface IEventTicketsButtonProps extends IPressableProps {
  ticketTypesCount: number
}

export const EventTicketsButton = ({
  ticketTypesCount,
  onPress,
}: IEventTicketsButtonProps) => {
  return (
    <Pressable
      p={5}
      borderWidth={1}
      borderColor="coolGray.300"
      shadow="3"
      bg="coolGray.100"
      onPress={onPress}
    >
      <Heading>Tickets</Heading>
      <Text>
        {ticketTypesCount ? `${ticketTypesCount} ticket types` : 'Add tickets'}
      </Text>
    </Pressable>
  )
}
