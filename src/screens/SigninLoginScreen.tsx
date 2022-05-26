import {
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  Input,
  Stack,
} from 'native-base'

export const SigninLoginScreen = () => (
  <Center flex={1}>
    <Container
      centerContent
      safeArea
      w={'100%'}
      flex={1}
      justifyContent="center"
    >
      <Heading mb={12}>Sign In to Taisho</Heading>
      <Stack w="100%" mb={12}>
        <FormControl>
          <FormControl.Label>email</FormControl.Label>
          <Input type="text"></Input>
        </FormControl>
        <FormControl>
          <FormControl.Label>password</FormControl.Label>
          <Input type="password"></Input>
        </FormControl>
      </Stack>
      <Button>Sign In</Button>
    </Container>
  </Center>
)
