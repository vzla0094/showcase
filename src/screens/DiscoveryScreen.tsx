import { ScrollView, Text } from 'native-base'

import { useAppSelector } from '../hooks'
import { DiscoveryView } from '../views/DiscoveryView'
import { useGetActiveDealsQuery } from '../redux/services/deals'
import { LoginBottomNavigation } from '../components/LoginBottomNavigation'
import { UnAuthStackScreenProps } from '../types'

interface IDiscoveryScreenProps {
  navigation: UnAuthStackScreenProps<'Discovery'>['navigation']
  loginBottom: boolean
}

export const DiscoveryScreen = ({
  navigation,
  loginBottom = false,
}: IDiscoveryScreenProps) => {
  const activeDealCategoryNames = useAppSelector(
    state => state.deals.activeDealCategoryNames
  )
  const { data, isLoading } = useGetActiveDealsQuery(activeDealCategoryNames)

  return isLoading || !data ? (
    <Text>Loading...</Text>
  ) : (
    <>
      <ScrollView>
        <DiscoveryView activeDealCategories={data} />
      </ScrollView>
      {loginBottom && <LoginBottomNavigation navigation={navigation} />}
    </>
  )
}
