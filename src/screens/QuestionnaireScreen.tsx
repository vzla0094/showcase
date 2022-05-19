import { useState } from 'react'
import { ToggleButtonValues } from '../types'
import { QuestionnaireView } from '../views/QuestionnaireView'

export const QuestionnaireScreen = () => {
  const [activeDeals, setActiveDeals] = useState<Array<ToggleButtonValues>>([])

  const handleToggleButton = (buttonValue: ToggleButtonValues) => {
    setActiveDeals(prevState => {
      const index = prevState.indexOf(buttonValue)
      if (index !== -1) return prevState.filter(value => value !== buttonValue)
      return [...prevState, buttonValue]
    })
  }

  const isDealActive = (buttonValue: ToggleButtonValues) =>
    activeDeals.includes(buttonValue)

  return (
    <QuestionnaireView
      handleToggleButton={handleToggleButton}
      isDealActive={isDealActive}
    />
  )
}
