import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { createDeal, getActiveDeals } from '../../../firebase'
import { DealCategoryNames, IDeal, IDealCategory } from '../../types'

export const dealsApi = createApi({
  reducerPath: 'dealsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Food', 'Activities', 'Events', 'Stay', 'Transportation'],
  endpoints: build => ({
    createDeal: build.mutation<IDeal, IDeal>({
      async queryFn(deal) {
        const [data, error] = await createDeal(deal)

        if (error) return { error }

        return { data }
      },
      invalidatesTags(response, error, deal) {
        return [deal.category]
      },
    }),
    getActiveDeals: build.query<Array<IDealCategory>, Array<DealCategoryNames>>(
      {
        async queryFn(activeDealCategories) {
          const [data, error] = await getActiveDeals(activeDealCategories)

          if (error) return { error }

          // TODO: optimize loop
          const normalizedData = activeDealCategories.map(dealCategory => ({
            category: dealCategory,
            deals: data.filter((deal: IDeal) => deal.category === dealCategory),
          }))

          return { data: normalizedData }
        },
        providesTags(response, error, activeDealsCategories) {
          return activeDealsCategories
        },
      }
    ),
  }),
})

export const { useCreateDealMutation, useGetActiveDealsQuery } = dealsApi
