import { Box, Heading, Text, Pressable, IPressableProps } from 'native-base'

interface ITicketTypeCardProps extends IPressableProps {
  name: string
  sold: number
  quantity: number
  price: number
}

export const TicketTypeCard = ({
  name,
  sold,
  quantity,
  price,
  onPress,
  ...props
}: ITicketTypeCardProps) => (
  <Pressable
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    p={4}
    bgColor={'white'}
    shadow={1}
    onPress={onPress}
    {...props}
  >
    <Box>
      <Heading>{name}</Heading>
      <Text>
        {sold}/{quantity} sold
      </Text>
    </Box>
    <Text>{price ? `$${price}` : 'Free'}</Text>
  </Pressable>
)
