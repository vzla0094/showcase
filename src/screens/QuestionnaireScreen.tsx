import { FC } from 'react'
import { RootStackScreenProps, DealCategoryNames } from '../types'
import { QuestionnaireView } from '../views/QuestionnaireView'
import { dealsActions } from '../redux/slices/deals'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useCreateDealMutation } from '../redux/services/deals'

export const QuestionnaireScreen: FC<RootStackScreenProps<'Questionnaire'>> = ({
  navigation,
}) => {
  const activeDeals = useAppSelector(
    state => state.deals.activeDealCategoryNames
  )
  const dispatch = useAppDispatch()
  const [createDeal] = useCreateDealMutation()
  const isDealActive = (buttonValue: DealCategoryNames) =>
    activeDeals.includes(buttonValue)

  return (
    <QuestionnaireView
      handleToggleButton={deal => {
        dispatch(dealsActions.setActiveDeals(deal))
      }}
      isDealActive={isDealActive}
      onContinue={() => {
        // TODO: Deal creation to be removed from here after Business section gets built
        activeDeals.map(dealCategory => {
          createDeal({
            category: dealCategory,
            timeSlots: {
              monday: [{ start: '', end: '' }],
            },
            dealId: '',
            active: false,
            validatedUsers: ['uuid', 'uuid'],
            title: 'Title',
            description: 'Description',
            imageGallery: [''],
            thumbnail: '',
            coverImage: '',
            startDate: '',
            endDate: '',
            quantityLimit: '',
            reviews: [
              {
                uuid: '',
                comment: '',
                rating: '',
              },
            ],
          })
        })
        navigation.navigate('Dashboard')
      }}
      disableContinue={!activeDeals.length}
    />
  )
}
