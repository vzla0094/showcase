import { FC } from 'react'
import { Heading, FlatList, Box } from 'native-base'
import { DealCategories } from '../types'
import { Deal } from './Deal'
import { useGetDealsQuery } from '../redux/services/deals'

interface IDealCategoryProps {
  category: DealCategories
}

export const DealCategory: FC<IDealCategoryProps> = ({ category }) => {
  const { data: deals } = useGetDealsQuery(category)

  return (
    <Box mb={5}>
      <Heading>{category}</Heading>
      <FlatList
        flexGrow={0}
        horizontal
        data={deals}
        renderItem={({ item }) => (
          <Box mr={3}>
            <Deal title={item.title} description={item.description} />
          </Box>
        )}
      />
    </Box>
  )
}
