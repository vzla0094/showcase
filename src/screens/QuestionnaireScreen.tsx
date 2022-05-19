import { useState } from 'react'
import { Deals } from '../types'
import { QuestionnaireView } from '../views/QuestionnaireView'

export const QuestionnaireScreen = () => {
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
    />
  )
}
