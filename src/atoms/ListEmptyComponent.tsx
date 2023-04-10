import { Text } from 'native-base'

export const ListEmptyComponent = ({ message }: { message: string }) => (
  <Text mt={12} alignSelf="center" variant="description" color="trueGray.300">
    {message}
  </Text>
)
