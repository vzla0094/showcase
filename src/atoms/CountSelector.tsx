import { Box, IconButton, Text } from 'native-base'
import { useState } from 'react'

interface ICountSelector {
  value: number
  minLimit?: number
  maxLimit?: number
  onPress: (value: number) => void
}

export const CountSelector = ({
  value,
  minLimit,
  maxLimit,
  onPress,
}: ICountSelector) => {
  const limitMin = (value: number) => {
    const limit = minLimit ? (value > minLimit ? value : minLimit) : value
    return limit >= 0 ? limit : 0
  }
  const limitMax = (value: number) =>
    maxLimit ? (value < maxLimit ? value : maxLimit) : value

  const [count, setCount] = useState<number>(limitMin(value))

  const send = (value: number, limit: (value: number) => number) => {
    const count = limit(value)
    setCount(count)
    onPress(count)
  }

  return (
    <Box>
      <IconButton onPress={() => send(count - 1, limitMin)} />
      <Text>{count}</Text>
      <IconButton onPress={() => send(count + 1, limitMax)} />
    </Box>
  )
}
