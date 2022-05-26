import { FC } from 'react'
import { Button, Text, Container, Center } from 'native-base'

export const DashboardHeader: FC = () => (
  <Center borderBottomWidth={1}>
    <Container
      w="100%"
      safeAreaTop
      pb={2}
      flexDirection="row"
      alignItems="center"
    >
      <Button mr={5}>Login</Button>
      <Text>Login to track or create deals</Text>
    </Container>
  </Center>
)
