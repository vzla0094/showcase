import { Square, Container, Heading, Pressable } from 'native-base'

export const LandingScreen = () => (
  <Container>
    <Pressable>
      <Square bg={'gray.400'} w="300" h="300" mb={10} shadow={3}>
        <Heading>Promote your business</Heading>
      </Square>
    </Pressable>
    <Pressable>
      <Square bg={'gray.400'} w="300" h="300" shadow={3}>
        <Heading>Looking for deals?</Heading>
      </Square>
    </Pressable>
  </Container>
)
