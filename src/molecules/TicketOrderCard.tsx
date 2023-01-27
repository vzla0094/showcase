import { Box, Heading, VStack, Text } from 'native-base'
import { useEffect, useState } from 'react'
import { CountSelector } from '../atoms/CountSelector'

interface ITicketOrderCard {
  name: string
  title: string
  description: string
  value?: number
  minLimit?: number
  maxLimit?: number
  onPress: (value: number) => void
}

export const TicketOrderCard = ({
  value,
  name,
  title,
  description,
  minLimit,
  maxLimit,
  onPress,
}: ITicketOrderCard) => {
  const [count, setCount] = useState<number>(value || 0)

  useEffect(() => {
    if (minLimit && count < minLimit) {
      setCount(minLimit)
    } else if (maxLimit && count > maxLimit) {
      setCount(maxLimit)
    }
  }, [maxLimit, minLimit])

  const limitMin = (value: number) =>
    minLimit ? (value > minLimit ? value : minLimit) : value
  const limitMax = (value: number) =>
    maxLimit ? (value < maxLimit ? value : maxLimit) : value

  const send = (value: number, limit: (value: number) => number) => {
    const count = limit(value)
    setCount(count)
    onPress(count)
  }

  return (
    <Box
      w="100%"
      bgColor="white"
      pt={3}
      pb={1}
      borderColor="muted.200"
      borderWidth={1}
      borderRadius={5}
    >
      <VStack
        flexDirection="row"
        px={3.5}
        pb={3}
        justifyContent="space-between"
        borderColor="muted.200"
        borderBottomWidth={1}
      >
        <Heading size="md" pt={3}>
          {name}
        </Heading>
        <Box>
          <VStack flexDirection="row" alignItems="center">
            <CountSelector
              onPress={() => send(count - 1, limitMin)}
              isDisabled={count === (minLimit || 0)}
              iconName="minus"
            />
            <Heading p={2}>{count}</Heading>
            <CountSelector
              onPress={() => send(count + 1, limitMax)}
              isDisabled={count === maxLimit}
              iconName="plus"
            />
          </VStack>
        </Box>
      </VStack>
      <VStack py={4} px={3.5}>
        <Heading size="md">{title}</Heading>
        <Text fontSize={12}>{description}</Text>
      </VStack>
    </Box>
  )
}
