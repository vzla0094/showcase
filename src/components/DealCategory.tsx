import { FC } from 'react'
import { Heading, FlatList, Box } from 'native-base'
import { IDealCategory } from '../types'
import { Deal } from './Deal'

interface IDealCategoryProps {
  dealCategory: IDealCategory
}

export const DealCategory: FC<IDealCategoryProps> = ({ dealCategory }) => (
  <Box mb={5}>
    <Heading>{dealCategory.name}</Heading>
    <FlatList
      flexGrow={0}
      horizontal
      data={dealCategory.deals}
      renderItem={({ item }) => (
        <Box mr={3}>
          <Deal title={item.title} description={item.description} />
        </Box>
      )}
    />
  </Box>
)
