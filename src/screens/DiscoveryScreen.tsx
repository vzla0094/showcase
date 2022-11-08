import { FC } from 'react'
import { Text } from 'native-base'

import { useAppSelector } from '../hooks'
import { DiscoveryView } from '../views/DiscoveryView'
import { useGetActiveDealsQuery } from '../redux/services/deals'
import { LoginBottomNavigation } from '../components/LoginBottomNavigation'
import { RootStackScreenProps } from '../types'

interface IDiscoveryScreenProps {
  navigation: RootStackScreenProps<'Discovery'>['navigation']
  loginBottom: boolean
}

export const DiscoveryScreen: FC<IDiscoveryScreenProps> = ({
  navigation,
  loginBottom = false,
}) => {
  const activeDealCategoryNames = useAppSelector(
    state => state.deals.activeDealCategoryNames
  )
  const { data, isLoading } = useGetActiveDealsQuery(activeDealCategoryNames)

  return isLoading || !data ? (
    <Text>Loading...</Text>
  ) : (
    <>
      <DiscoveryView activeDealCategories={data} />
      {loginBottom && <LoginBottomNavigation navigation={navigation} />}
    </>
  )
}
