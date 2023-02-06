import { ErrorMessage, Formik, FormikConfig, FormikProps } from 'formik'
import { Box, Button, FlatList, Heading, Text } from 'native-base'

import { TicketOrderCard } from '../../molecules/TicketOrderCard'

import { TicketsPurchaseFormSchema } from './schema'

import { IEvent, ITicketOrder, ITicketType } from '../../types'

interface ITicketPurchaseForm {
  ticketTypes: Array<ITicketType>
  eventName: IEvent['name']
  eventStart: IEvent['startDateTime']
  eventEnd: IEvent['endDateTime']
  onSubmit: FormikConfig<Array<ITicketOrder>>['onSubmit']
  initialValues: Array<ITicketOrder>
}

export const TicketPurchaseForm = ({
  ticketTypes,
  eventName,
  eventStart,
  eventEnd,
  onSubmit,
  initialValues,
}: ITicketPurchaseForm) => {
  const handleChange = (
    value: number,
    index: number,
    {
      setStatus,
      setFieldValue,
    }: Pick<FormikProps<Array<ITicketOrder>>, 'setStatus' | 'setFieldValue'>
  ) => {
    if (value > 0) setStatus('')
    setFieldValue(`${index}.amount`, value)
  }

  return (
    <Box flex={1}>
      <Box alignItems="center">
        <Heading>{eventName}</Heading>
        <Heading size="md">
          {eventStart} - {eventEnd}
        </Heading>
      </Box>

      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validationSchema={TicketsPurchaseFormSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleSubmit, setFieldValue, status, setStatus }) => (
          <Box flex={1}>
            <FlatList
              data={ticketTypes}
              keyExtractor={({ id }) => id}
              renderItem={({ item: { name, price, description }, index }) => (
                <Box>
                  <TicketOrderCard
                    value={values[index].amount}
                    name={name}
                    price={price}
                    description={description}
                    onChange={value =>
                      handleChange(value, index, { setStatus, setFieldValue })
                    }
                    disableSubtract={values[index].amount < 1}
                  />
                  <ErrorMessage name={`${index}.amount`}>
                    {msg => <Text color="error.500">{msg}</Text>}
                  </ErrorMessage>
                </Box>
              )}
            />

            {status && (
              <Text textAlign="center" color="error.500">
                {status}
              </Text>
            )}

            <Button onPress={() => handleSubmit()}>Confirm</Button>
          </Box>
        )}
      </Formik>
    </Box>
  )
}
