import { FC } from 'react'
import { Button, Text, Container, Center } from 'native-base'
import { UnAuthStackScreenProps } from '../types'

export const DashboardHeader: FC<UnAuthStackScreenProps<'Discovery'>> = ({
  navigation,
}) => (
  <Center borderBottomWidth={1}>
    <Container
      w="100%"
      safeAreaTop
      pb={2}
      flexDirection="row"
      alignItems="center"
    >
      <Button mr={5} onPress={() => navigation.navigate('LoginOrRegister')}>
        Login
      </Button>
      <Text>Login to track or create deals</Text>
    </Container>
  </Center>
)
