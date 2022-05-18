import { Button, Container, Heading, VStack } from 'native-base'

export const QuestionnaireScreen = () => (
  <Container safeArea flex={1}>
    <Heading mt="20" mb="10">
      What kind of deals are you looking for?
    </Heading>
    <VStack space={4} alignSelf="stretch">
      <Button>Food</Button>
      <Button>Activities</Button>
      <Button>Events</Button>
      <Button>Stay</Button>
      <Button>Transportation</Button>
    </VStack>
  </Container>
)
