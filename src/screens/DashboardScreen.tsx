import { useAppSelector } from '../hooks'
import { DashboardView } from '../views/DashboardView'

export const DashboardScreen = () => {
  const activeDealCategories = useAppSelector(
    state => state.deals.activeDealCategories
  )
  return <DashboardView activeDealCategories={activeDealCategories} />
}
