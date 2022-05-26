import { useAppSelector } from '../hooks'
import { DashboardView } from '../views/DashboardView'
import { useGetActiveDealsQuery } from '../redux/services/deals'
import { Text } from 'native-base'
import { IDealCategory } from '../types'

export const DashboardScreen = () => {
  const activeDealCategoryNames = useAppSelector(
    state => state.deals.activeDealCategoryNames
  )
  const { data, isLoading } = useGetActiveDealsQuery(activeDealCategoryNames)

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <DashboardView activeDealCategories={data as Array<IDealCategory>} />
  )
}
