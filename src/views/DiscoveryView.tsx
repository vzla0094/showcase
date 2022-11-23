import { IDealCategory } from '../types'
import { FC } from 'react'
import { DealCategory } from '../components/DealCategory'
import { ViewContainer } from '../atoms/ViewContainer'

interface IDashboardView {
  activeDealCategories: Array<IDealCategory>
}

export const DiscoveryView: FC<IDashboardView> = ({ activeDealCategories }) => (
  <ViewContainer scroll>
    {activeDealCategories.map(dealCategory => (
      <DealCategory key={dealCategory.name} dealCategory={dealCategory} />
    ))}
  </ViewContainer>
)
