import { Button, Container, Heading, VStack } from 'native-base'
import { ToggleButton } from '../components/ToggleButton'
import { useState } from 'react'
import { ToggleButtonValues } from '../types'

export const QuestionnaireScreen = () => {
  const [active, setActive] = useState<Array<ToggleButtonValues>>([])

  const handlePress = (buttonValue: ToggleButtonValues) => {
    setActive(prevState => {
      const index = prevState.indexOf(buttonValue)
      if (index !== -1) return prevState.filter(value => value !== buttonValue)
      return [...prevState, buttonValue]
    })
  }

  const getActive = (buttonValue: ToggleButtonValues) =>
    active.includes(buttonValue)

  return (
    <Container centerContent safeArea flex={1} w="100%">
      <Heading mt="20" mb="10">
        What kind of deals are you looking for?
      </Heading>
      <VStack flex={1} space={8} alignSelf="stretch" mb="10">
        <ToggleButton
          onPress={handlePress}
          active={getActive('Food')}
          value="Food"
        />
        <ToggleButton
          onPress={handlePress}
          active={getActive('Activities')}
          value="Activities"
        />
        <ToggleButton
          onPress={handlePress}
          active={getActive('Events')}
          value="Events"
        />
        <ToggleButton
          onPress={handlePress}
          active={getActive('Stay')}
          value="Stay"
        />
        <ToggleButton
          onPress={handlePress}
          active={getActive('Transportation')}
          value="Transportation"
        />
      </VStack>
      <Button variant="ghost">Continue</Button>
    </Container>
  )
}
