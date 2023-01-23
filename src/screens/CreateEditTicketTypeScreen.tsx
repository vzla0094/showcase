import { useEffect } from 'react'
import { Button, VStack } from 'native-base'
import { Formik } from 'formik'
import * as yup from 'yup'

import { ViewContainer } from '../atoms/ViewContainer'
import { FormikInput } from '../atoms/FormikInput'
import { useAppDispatch, useAppSelector } from '../hooks'
import { createTicketType, editTicketType } from '../redux/slices/user'

import {
  CompanyStackScreenProps,
  emptyTicketType,
  TICKET_TYPE_FORM_FIELDS,
  TicketTypeFormValuesType,
} from '../types'

export const CreateEditTicketTypeScreen = ({
  route,
  navigation,
}: CompanyStackScreenProps<'CreateEditTicketType'>) => {
  const ticketType = useAppSelector(
    ({ user }) =>
      user.activeEvent.ticketTypes.find(tt => tt.id === route.params?.id) ||
      emptyTicketType
  )
  const dispatch = useAppDispatch()
  const ticketTypeExists = Boolean(ticketType?.id)

  useEffect(() => {
    navigation.setOptions({
      title: ticketTypeExists ? 'Edit ticket type' : 'Create ticket type',
    })
  }, [ticketType])

  const initialValues: TicketTypeFormValuesType = {
    name: ticketType.name,
    description: ticketType.description,
    quantity: ticketType.quantity,
    price: ticketType.price,
    minTicketsPerOrder: ticketType.minTicketsPerOrder,
    maxTicketsPerOrder: ticketType.maxTicketsPerOrder,
  }

  const schema = yup.object({
    name: yup.string().required(),
    description: yup.string(),
    quantity: yup.number().typeError('Must be a number'),
    price: yup.number().typeError('Must be a number'),
    minTicketsPerOrder: yup.number().typeError('Must be a number'),
    maxTicketsPerOrder: yup.number().typeError('Must be a number'),
  })

  const handleSubmit = async (values: TicketTypeFormValuesType) => {
    ticketTypeExists
      ? await dispatch(editTicketType({ ...ticketType, ...values }))
      : await dispatch(createTicketType({ ...ticketType, ...values }))

    navigation.goBack()
  }

  return (
    <ViewContainer alignItems="stretch">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          errors,
          setFieldValue,
        }) => (
          <VStack space={4}>
            <FormikInput
              value={values[TICKET_TYPE_FORM_FIELDS.Name]}
              fieldName={TICKET_TYPE_FORM_FIELDS.Name}
              handleBlur={handleBlur(TICKET_TYPE_FORM_FIELDS.Name)}
              handleChange={handleChange(TICKET_TYPE_FORM_FIELDS.Name)}
              errors={errors}
              label="Ticket type name"
            />

            <FormikInput
              value={values[TICKET_TYPE_FORM_FIELDS.Description]}
              fieldName={TICKET_TYPE_FORM_FIELDS.Description}
              handleBlur={handleBlur(TICKET_TYPE_FORM_FIELDS.Description)}
              handleChange={handleChange(TICKET_TYPE_FORM_FIELDS.Description)}
              errors={errors}
              label="Description"
            />

            <FormikInput
              value={values[TICKET_TYPE_FORM_FIELDS.Quantity].toString()}
              fieldName={TICKET_TYPE_FORM_FIELDS.Quantity}
              handleBlur={handleBlur(TICKET_TYPE_FORM_FIELDS.Quantity)}
              handleChange={value =>
                setFieldValue(
                  TICKET_TYPE_FORM_FIELDS.Quantity,
                  parseInt(value) || value
                )
              }
              errors={errors}
              label="Quantity"
            />

            <FormikInput
              value={values[TICKET_TYPE_FORM_FIELDS.Price].toString()}
              fieldName={TICKET_TYPE_FORM_FIELDS.Price}
              handleBlur={handleBlur(TICKET_TYPE_FORM_FIELDS.Price)}
              handleChange={value =>
                setFieldValue(
                  TICKET_TYPE_FORM_FIELDS.Price,
                  parseInt(value) || value
                )
              }
              errors={errors}
              label="Price"
            />

            <FormikInput
              value={values[
                TICKET_TYPE_FORM_FIELDS.MinTicketsPerOrder
              ].toString()}
              fieldName={TICKET_TYPE_FORM_FIELDS.MinTicketsPerOrder}
              handleBlur={handleBlur(
                TICKET_TYPE_FORM_FIELDS.MinTicketsPerOrder
              )}
              handleChange={value =>
                setFieldValue(
                  TICKET_TYPE_FORM_FIELDS.MinTicketsPerOrder,
                  parseInt(value) || value
                )
              }
              errors={errors}
              label="Min tickets per order"
            />

            <FormikInput
              value={values[
                TICKET_TYPE_FORM_FIELDS.MaxTicketsPerOrder
              ].toString()}
              fieldName={TICKET_TYPE_FORM_FIELDS.MaxTicketsPerOrder}
              handleBlur={handleBlur(
                TICKET_TYPE_FORM_FIELDS.MaxTicketsPerOrder
              )}
              handleChange={value =>
                setFieldValue(
                  TICKET_TYPE_FORM_FIELDS.MaxTicketsPerOrder,
                  parseInt(value) || value
                )
              }
              errors={errors}
              label="Max tickets per order"
            />

            <Button
              onPress={() => {
                handleSubmit()
              }}
            >
              Save and go back
            </Button>
          </VStack>
        )}
      </Formik>
    </ViewContainer>
  )
}
