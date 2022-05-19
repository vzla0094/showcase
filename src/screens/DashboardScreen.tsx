import { Center, Container, Heading } from 'native-base'
import { useAppSelector } from '../hooks'

export const DashboardScreen = () => {
  const activeDeals = useAppSelector(state => state.deals.activeDeals)
  return (
    <Center flex={1}>
      <Container safeArea flex={1} w="100%">
        {activeDeals.map(deal => (
          <Heading key={deal}>{deal}</Heading>
        ))}
      </Container>
    </Center>
  )
}
