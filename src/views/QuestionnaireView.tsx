import { Button, Heading, VStack } from 'native-base'
import { ToggleButton } from '../components/ToggleButton'
import { ToggleButtonOnPress, DealCategoryNames } from '../types'
import { FC } from 'react'
import { ViewContainer } from '../atoms/ViewContainer'

interface IQuestionnaireView {
  handleToggleButton: ToggleButtonOnPress
  isDealActive: (buttonValue: DealCategoryNames) => boolean
  onContinue: () => void
  disableContinue: boolean
}

export const QuestionnaireView: FC<IQuestionnaireView> = ({
  handleToggleButton,
  isDealActive,
  onContinue,
  disableContinue,
}) => (
  <ViewContainer>
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
    <Button disabled={disableContinue} onPress={onContinue} variant="ghost">
      Continue
    </Button>
  </ViewContainer>
)
