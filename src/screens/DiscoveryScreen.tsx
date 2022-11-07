import { useAppSelector } from '../hooks'
import { DiscoveryView } from '../views/DiscoveryView'
import { useGetActiveDealsQuery } from '../redux/services/deals'
import { Text } from 'native-base'

export const DiscoveryScreen = () => {
  const activeDealCategoryNames = useAppSelector(
    state => state.deals.activeDealCategoryNames
  )
  const { data, isLoading } = useGetActiveDealsQuery(activeDealCategoryNames)

  return isLoading || !data ? (
    <Text>Loading...</Text>
  ) : (
    <DiscoveryView activeDealCategories={data} />
  )
}
