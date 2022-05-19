import { FC } from 'react'
import { RootStackScreenProps, Deals } from '../types'
import { QuestionnaireView } from '../views/QuestionnaireView'
import { dealsActions } from '../redux/slices/deals'
import { useAppDispatch, useAppSelector } from '../hooks'

export const QuestionnaireScreen: FC<RootStackScreenProps<'Questionnaire'>> = ({
  navigation,
}) => {
  const activeDeals = useAppSelector(state => state.deals.activeDeals)
  const dispatch = useAppDispatch()
  const isDealActive = (buttonValue: Deals) => activeDeals.includes(buttonValue)

  return (
    <QuestionnaireView
      handleToggleButton={deal => {
        dispatch(dealsActions.setActiveDeals(deal))
      }}
      isDealActive={isDealActive}
      onContinue={() => activeDeals.length && navigation.navigate('Dashboard')}
    />
  )
}
