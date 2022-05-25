import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { getDeals, createDeal, getActiveDeals } from '../../../firebase'
import { DealCategories, IDeal } from '../../types'

export const dealsApi = createApi({
  reducerPath: 'dealsApi',
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    createDeal: build.mutation<IDeal, IDeal>({
      async queryFn(deal) {
        const [data, error] = await createDeal(deal)

        if (error) return { error }

        return { data }
      },
      async onQueryStarted(deal, { dispatch, queryFulfilled }) {
        // update cache directly instead of waiting for server response giving the user 'instant update' experience
        // docs: https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates#optimistic-updates
        const createDealResult = dispatch(
          dealsApi.util.updateQueryData('getDeals', deal.category, draft => {
            draft.push(deal)
          })
        )
        try {
          await queryFulfilled
        } catch {
          createDealResult.undo()
        }
      },
    }),
    getDeals: build.query<Array<IDeal>, DealCategories>({
      async queryFn(dealCategory) {
        const [data, error] = await getDeals(dealCategory)

        if (error) return { error }

        return { data }
      },
    }),
    getActiveDeals: build.query<Array<IDeal>, Array<DealCategories>>({
      async queryFn(activeDealCategories) {
        const [data, error] = await getActiveDeals(activeDealCategories)

        if (error) return { error }

        return { data }
      },
    }),
  }),
})

export const {
  useCreateDealMutation,
  useGetDealsQuery,
  useGetActiveDealsQuery,
} = dealsApi
