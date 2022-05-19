import { useAppSelector } from '../hooks'
import { DashboardView } from '../views/DashboardView'

export const DashboardScreen = () => {
  const activeDeals = useAppSelector(state => state.deals.activeDeals)
  return <DashboardView activeDeals={activeDeals} />
}
