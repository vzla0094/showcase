import { FC } from 'react'
import { Heading, FlatList, Box } from 'native-base'
import { DealCategories } from '../types'
import { Deal } from './Deal'

interface IDealCategoryProps {
  category: DealCategories
  deals: Array<{ title: string; description: string }>
}

export const DealCategory: FC<IDealCategoryProps> = ({ category, deals }) => (
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
