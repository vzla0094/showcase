import { Box, Heading } from 'native-base'

export const PriceTag = ({ price }: { price: number }) => (
  <Box
    bg="lightText"
    rounded="full"
    justifyContent="center"
    alignSelf="center"
    py={2}
    px={5}
  >
    <Heading size="h2">${price}</Heading>
  </Box>
)
