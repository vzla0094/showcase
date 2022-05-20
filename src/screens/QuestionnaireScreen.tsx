import { FC } from 'react'
import { RootStackScreenProps, DealCategories } from '../types'
import { QuestionnaireView } from '../views/QuestionnaireView'
import { dealsActions } from '../redux/slices/deals'
import { useAppDispatch, useAppSelector } from '../hooks'

export const QuestionnaireScreen: FC<RootStackScreenProps<'Questionnaire'>> = ({
  navigation,
}) => {
  const activeDeals = useAppSelector(state => state.deals.activeDealCategories)
  const dispatch = useAppDispatch()
  const isDealActive = (buttonValue: DealCategories) =>
    activeDeals.includes(buttonValue)

  return (
    <QuestionnaireView
      handleToggleButton={deal => {
        dispatch(dealsActions.setActiveDeals(deal))
      }}
      isDealActive={isDealActive}
      onContinue={() => navigation.navigate('Dashboard')}
      disableContinue={!activeDeals.length}
    />
  )
}
