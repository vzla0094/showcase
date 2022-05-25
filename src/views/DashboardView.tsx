import { IDealCategory } from '../types'
import { FC } from 'react'
import { Center, Container } from 'native-base'
import { DealCategory } from '../components/DealCategory'

interface IDashboardView {
  activeDealCategories: Array<IDealCategory>
}

export const DashboardView: FC<IDashboardView> = ({ activeDealCategories }) => (
  <Center flex={1}>
    <Container safeArea flex={1} w="100%">
      {activeDealCategories.map(dealCategory => (
        <DealCategory key={dealCategory.category} dealCategory={dealCategory} />
      ))}
    </Container>
  </Center>
)
