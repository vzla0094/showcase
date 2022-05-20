import { FC } from 'react'
import { Box, Heading, Text } from 'native-base'
import { IDealProps } from '../types'

export const Deal: FC<IDealProps> = ({ title, description }) => (
  <Box w="150" h="150" borderColor="black" borderWidth={1}>
    <Box bg="gray.300" w={'100%'} flex={2} />
    <Box flex={1} p={2}>
      <Heading size="sm">{title}</Heading>
      <Text>{description}</Text>
    </Box>
  </Box>
)
