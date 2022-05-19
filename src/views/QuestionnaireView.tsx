import { Button, Container, Heading, VStack } from 'native-base'
import { ToggleButton } from '../components/ToggleButton'
import { ToggleButtonOnPress, ToggleButtonValues } from '../types'
import { FC } from 'react'

interface IQuestionnaireView {
  handleToggleButton: ToggleButtonOnPress
  getActive: (buttonValue: ToggleButtonValues) => boolean
}

export const QuestionnaireView: FC<IQuestionnaireView> = ({
  handleToggleButton,
  getActive,
}) => (
  <Container centerContent safeArea flex={1} w="100%">
    <Heading mt="20" mb="10">
      What kind of deals are you looking for?
    </Heading>
    <VStack flex={1} space={8} alignSelf="stretch" mb="10">
      <ToggleButton
        onPress={handleToggleButton}
        active={getActive('Food')}
        value="Food"
      />
      <ToggleButton
        onPress={handleToggleButton}
        active={getActive('Activities')}
        value="Activities"
      />
      <ToggleButton
        onPress={handleToggleButton}
        active={getActive('Events')}
        value="Events"
      />
      <ToggleButton
        onPress={handleToggleButton}
        active={getActive('Stay')}
        value="Stay"
      />
      <ToggleButton
        onPress={handleToggleButton}
        active={getActive('Transportation')}
        value="Transportation"
      />
    </VStack>
    <Button variant="ghost">Continue</Button>
  </Container>
)
