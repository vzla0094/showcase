import { Deals } from '../types'
import { FC } from 'react'
import { Center, Container, Heading } from 'native-base'

interface IDashboardView {
  activeDeals: Array<Deals>
}

export const DashboardView: FC<IDashboardView> = ({ activeDeals }) => (
  <Center flex={1}>
    <Container safeArea flex={1} w="100%">
      {activeDeals.map(deal => (
        <Heading key={deal}>{deal}</Heading>
      ))}
    </Container>
  </Center>
)
