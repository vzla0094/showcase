import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { getDeals, createDeal } from '../../../firebase'
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
    }),
    getDeals: build.query<Array<IDeal>, DealCategories>({
      async queryFn(dealCategory) {
        const [data, error] = await getDeals(dealCategory)

        if (error) return { error }

        return { data }
      },
    }),
  }),
})

export const { useCreateDealMutation, useGetDealsQuery } = dealsApi
