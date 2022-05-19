import { Button, Center, Container, Heading, VStack } from 'native-base'
import { ToggleButton } from '../components/ToggleButton'
import { ToggleButtonOnPress, Deals } from '../types'
import { FC } from 'react'

interface IQuestionnaireView {
  handleToggleButton: ToggleButtonOnPress
  isDealActive: (buttonValue: Deals) => boolean
}

export const QuestionnaireView: FC<IQuestionnaireView> = ({
  handleToggleButton,
  isDealActive,
}) => (
  <Center flex={1}>
    <Container centerContent safeArea flex={1} w="100%">
      <Heading mt="20" mb="10">
        What kind of deals are you looking for?
      </Heading>
      <VStack flex={1} space={8} alignSelf="stretch" mb="10">
        <ToggleButton
          onPress={handleToggleButton}
          active={isDealActive('Food')}
          value="Food"
        />
        <ToggleButton
          onPress={handleToggleButton}
          active={isDealActive('Activities')}
          value="Activities"
        />
        <ToggleButton
          onPress={handleToggleButton}
          active={isDealActive('Events')}
          value="Events"
        />
        <ToggleButton
          onPress={handleToggleButton}
          active={isDealActive('Stay')}
          value="Stay"
        />
        <ToggleButton
          onPress={handleToggleButton}
          active={isDealActive('Transportation')}
          value="Transportation"
        />
      </VStack>
      <Button variant="ghost">Continue</Button>
    </Container>
  </Center>
)
