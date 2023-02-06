import { Button, VStack } from 'native-base'
import { Formik } from 'formik'
import * as yup from 'yup'

import { ViewContainer } from '../atoms/ViewContainer'
import { FormikInput } from '../atoms/FormikInput'

import { CompanyStackScreenProps, ITicket } from '../types'
import { useAppDispatch, useAppSelector } from '../hooks'
import { redeemTicket } from '../redux/slices/activeEvent'

enum REDEMPTION_TICKET {
  TicketId = 'ticketId',
}

interface IRedeemTicketType {
  [REDEMPTION_TICKET.TicketId]: ITicket['id']
}

const labelInput: Record<keyof IRedeemTicketType, string> = {
  ticketId: 'Ticket ID',
}

const initialValues: IRedeemTicketType = {
  ticketId: '',
}

const schema = yup.object({
  ticketId: yup.string().required().label(labelInput.ticketId),
})

export const RedeemTicketScreen = ({
  navigation,
}: CompanyStackScreenProps<'RedeemTicket'>) => {
  const { tickets } = useAppSelector(({ activeEvent }) => activeEvent)
  const dispatch = useAppDispatch()

  const findTicket = (ticketId: ITicket['id']) =>
    tickets.find(({ id, state }) => state === 'reserved' && id === ticketId)

  const handleSubmit = async (values: IRedeemTicketType) => {
    const ticket = findTicket(values.ticketId)
    if (!ticket) return

    await dispatch(redeemTicket(ticket))
    navigation.goBack()
  }

  return (
    <ViewContainer alignItems="stretch">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ values, handleChange, handleSubmit, handleBlur, errors }) => (
          <VStack space={4}>
            <FormikInput
              value={values[REDEMPTION_TICKET.TicketId]}
              fieldName={REDEMPTION_TICKET.TicketId}
              handleBlur={handleBlur(REDEMPTION_TICKET.TicketId)}
              handleChange={handleChange(REDEMPTION_TICKET.TicketId)}
              label={labelInput.ticketId}
              errors={errors}
            />
            <Button onPress={() => handleSubmit()}>Confirm</Button>
          </VStack>
        )}
      </Formik>
    </ViewContainer>
  )
}
