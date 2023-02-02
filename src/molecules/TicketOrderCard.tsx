import { Box, Heading, VStack, Text } from 'native-base'

import { CountSelector } from '../atoms/CountSelector'

import { ITicketType } from '../types'

interface ITicketOrderCard {
  name: ITicketType['name']
  price: ITicketType['price']
  description: ITicketType['description']
  value: number
  onChange: (value: number) => void

  disableAdd?: boolean
  disableSubtract?: boolean
}

export const TicketOrderCard = ({
  value,
  name,
  price,
  description,
  onChange,

  disableAdd = false,
  disableSubtract = false,
}: ITicketOrderCard) => (
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
            onPress={() => onChange(value - 1)}
            isDisabled={disableSubtract}
            iconName="minus"
          />
          <Heading p={2}>{value}</Heading>
          <CountSelector
            onPress={() => onChange(value + 1)}
            isDisabled={disableAdd}
            iconName="plus"
          />
        </VStack>
      </Box>
    </VStack>
    <VStack py={4} px={3.5}>
      <Heading size="md">{price ? `$${price}` : 'Free'}</Heading>
      <Text fontSize={12}>{description}</Text>
    </VStack>
  </Box>
)
