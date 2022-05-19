import { useState } from 'react'
import { ToggleButtonValues } from '../types'
import { QuestionnaireView } from '../views/QuestionnaireView'

export const QuestionnaireScreen = () => {
  const [active, setActive] = useState<Array<ToggleButtonValues>>([])

  const handleToggleButton = (buttonValue: ToggleButtonValues) => {
    setActive(prevState => {
      const index = prevState.indexOf(buttonValue)
      if (index !== -1) return prevState.filter(value => value !== buttonValue)
      return [...prevState, buttonValue]
    })
  }

  const getActive = (buttonValue: ToggleButtonValues) =>
    active.includes(buttonValue)

  return (
    <QuestionnaireView
      handleToggleButton={handleToggleButton}
      getActive={getActive}
    />
  )
}
