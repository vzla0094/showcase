import { FC, useState } from 'react'
import { RootStackScreenProps, Deals } from '../types'
import { QuestionnaireView } from '../views/QuestionnaireView'

export const QuestionnaireScreen: FC<RootStackScreenProps<'Questionnaire'>> = ({
  navigation,
}) => {
  const [activeDeals, setActiveDeals] = useState<Array<Deals>>([])

  const handleToggleButton = (buttonValue: Deals) => {
    setActiveDeals(prevState => {
      const index = prevState.indexOf(buttonValue)
      if (index !== -1) return prevState.filter(value => value !== buttonValue)
      return [...prevState, buttonValue]
    })
  }

  const isDealActive = (buttonValue: Deals) => activeDeals.includes(buttonValue)

  return (
    <QuestionnaireView
      handleToggleButton={handleToggleButton}
      isDealActive={isDealActive}
      onContinue={() => activeDeals.length && navigation.navigate('Dashboard')}
    />
  )
}
