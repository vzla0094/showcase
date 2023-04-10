import {
  Box,
  Circle,
  Divider,
  Heading,
  IPressableProps,
  Pressable,
  Text,
} from 'native-base'
import { ITicketType } from '../types'

interface IEventTicketsButtonProps extends IPressableProps {
  ticketType: ITicketType
}

export const TicketType = ({
  ticketType,
  onPress,
  ...props
}: IEventTicketsButtonProps) => {
  const dentCircleSize = 3

  const {
    quantity,
    sold,
    name,
    price,
    minTicketsPerOrder,
    maxTicketsPerOrder,
  } = ticketType
  return (
    <Pressable onPress={onPress} flexDirection="row" {...props}>
      <Box
        justifyContent="center"
        p={4}
        borderColor="trueGray.300"
        borderWidth={1}
        borderRightWidth={0}
      >
        <Heading size="h4">
          {sold}/{quantity}
        </Heading>
      </Box>

      <Box
        w={dentCircleSize}
        position={'relative'}
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        <Box
          top={-dentCircleSize}
          bottom={-dentCircleSize}
          position={'absolute'}
          justifyContent="space-between"
          alignItems="center"
        >
          <Circle
            borderColor="trueGray.300"
            borderWidth={1}
            w={dentCircleSize}
            h={dentCircleSize}
          />
          <Divider orientation={'vertical'} flexShrink={1} />
          <Circle
            borderColor="trueGray.300"
            borderWidth={1}
            w={dentCircleSize}
            h={dentCircleSize}
          />
        </Box>
      </Box>

      <Box
        borderLeftWidth={0}
        flex={1}
        p={4}
        borderColor="trueGray.300"
        borderWidth={1}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box justifyContent="center">
          <Heading size="h3">{name}</Heading>
          <Heading size="h4" color="tertiary.400">
            ${price}
          </Heading>
        </Box>
        <Box justifyContent="center">
          <Text variant="description" color="trueGray.300">
            {minTicketsPerOrder} Min
          </Text>
          <Text variant="description" color="trueGray.300">
            {maxTicketsPerOrder} Max
          </Text>
        </Box>
      </Box>
    </Pressable>
  )
}
