import { Button, Center, Container, Divider, Heading, Input } from 'native-base'

export const ProfileScreen = () => (
  <Center flex={1}>
    <Container safeArea flex={1} w="100%">
      <Heading>User details</Heading>
      <Input size="lg" placeholder="Display name" />
      <Input size="lg" placeholder="Birthday" />
      <Input size="lg" placeholder="Phone number" />
      <Button>Save user details</Button>
      <Divider />
      <Heading>Company details</Heading>
      <Input size="lg" placeholder="Company name" />
      <Heading size="md">Address</Heading>
      <Input size="lg" placeholder="Street" />
      <Input size="lg" placeholder="City" />
      <Input size="lg" placeholder="State / Province" />
      <Input size="lg" placeholder="Country" />
      <Input size="lg" placeholder="Zip code" />
      <Heading size="md">Contact information</Heading>
      <Input size="lg" placeholder="Telephone number" />
      <Input size="lg" placeholder="Cellphone number" />
      <Input size="lg" placeholder="Email" />
      <Button>Save company details</Button>
    </Container>
  </Center>
)
