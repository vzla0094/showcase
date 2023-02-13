import * as yup from 'yup'

import { ITicketOrder } from '../../types'

export const TicketsPurchaseFormSchema = yup.array().of(
  yup.object().shape({
    ticketTypeId: yup.string().required(),
    eventId: yup.string().required(),
    eventCategory: yup.string().required(),
    amount: yup
      .number()
      .required()
      .test('is-min', (value, context) => {
        if (value === 0) return true // no need to check if 0
        const { minTicketsPerOrder } = context.parent as ITicketOrder

        if (value && value >= minTicketsPerOrder) return true

        return context.createError({
          message: `Minimum amount of tickets is ${minTicketsPerOrder}`,
        })
      })
      .test('is-max', (value, context) => {
        if (value === 0) return true // no need to check if 0
        const { maxTicketsPerOrder } = context.parent as ITicketOrder

        if (value && value <= maxTicketsPerOrder) return true

        // TODO: also return true if available tickets < maxTicketsPerOrder

        return context.createError({
          message: `Maximum amount of tickets is ${maxTicketsPerOrder}`,
        })
      }),
  })
)
