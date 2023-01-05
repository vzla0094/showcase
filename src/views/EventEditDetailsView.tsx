import { useEffect, useRef } from 'react'
import {
  Button,
  IconButton,
  Select,
  VStack,
  Switch,
  HStack,
  Text,
} from 'native-base'
import { Formik, FormikProps, FormikValues } from 'formik'
import { useNavigation } from '@react-navigation/native'

import { ViewContainer } from '../atoms/ViewContainer'
import { FormikInput } from '../atoms/FormikInput'

import {
  CompanyStackScreenProps,
  emptyEvent,
  EVENT_FORM_FIELD_NAMES,
  EventFormValuesType,
  IEvent,
} from '../types'

export interface IOnSubmitPayload {
  prevEvent?: IEvent
  event: IEvent
}

interface IEventEditDetailsViewProps {
  event?: IEvent
  onSubmit: (payload: IOnSubmitPayload) => void
  onDelete: (event: IEvent) => void
}

export const EventEditDetailsView = ({
  event = emptyEvent,
  onSubmit,
  onDelete,
}: IEventEditDetailsViewProps) => {
  const navigation =
    useNavigation<CompanyStackScreenProps<'Event'>['navigation']>()
  const formikRef = useRef<FormikProps<FormikValues>>(null)
  const eventExists = Boolean(event?.id)

  useEffect(() => {
    navigation.setOptions({
      // useEffect doesn't like returning null here for hiding the button,
      // adding a display="none" instead fixes the warning
      headerLeft: () => <IconButton display="none" />,
      headerRight: () => <IconButton display="none" />,
      title: eventExists ? 'Edit event' : 'Create event',
    })
  }, [navigation, eventExists])

  const initialValues: EventFormValuesType = {
    name: event.name,
    description: event.description,
    address: event.address,
    category: event.category,
    state: event.state,
  }

  return (
    <ViewContainer alignItems="stretch">
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          let payload: IOnSubmitPayload = { event }

          if (eventExists) {
            payload = { prevEvent: event, event: { ...event, ...values } }
          }

          if (!eventExists) {
            payload = { event: { ...event, ...values } }
          }

          onSubmit(payload)
        }}
        innerRef={formikRef}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          errors,
          setFieldValue,
        }) => {
          return (
            <VStack space={4}>
              <FormikInput
                key={EVENT_FORM_FIELD_NAMES.Name}
                value={values[EVENT_FORM_FIELD_NAMES.Name]}
                fieldName={EVENT_FORM_FIELD_NAMES.Name}
                handleBlur={handleBlur(EVENT_FORM_FIELD_NAMES.Name)}
                handleChange={handleChange(EVENT_FORM_FIELD_NAMES.Name)}
                errors={errors}
                label="Event name"
              />

              <FormikInput
                key={EVENT_FORM_FIELD_NAMES.Address}
                value={values[EVENT_FORM_FIELD_NAMES.Address]}
                fieldName={EVENT_FORM_FIELD_NAMES.Address}
                handleBlur={handleBlur(EVENT_FORM_FIELD_NAMES.Address)}
                handleChange={handleChange(EVENT_FORM_FIELD_NAMES.Address)}
                errors={errors}
                label="Address"
              />

              <FormikInput
                key={EVENT_FORM_FIELD_NAMES.Description}
                value={values[EVENT_FORM_FIELD_NAMES.Description]}
                fieldName={EVENT_FORM_FIELD_NAMES.Description}
                handleBlur={handleBlur(EVENT_FORM_FIELD_NAMES.Description)}
                handleChange={handleChange(EVENT_FORM_FIELD_NAMES.Description)}
                errors={errors}
                label="description"
              />

              <Select
                placeholder="Select a category"
                selectedValue={values[EVENT_FORM_FIELD_NAMES.Category]}
                onValueChange={value => setFieldValue('category', value)}
              >
                <Select.Item label="Food" value="food" />
                <Select.Item label="Activities" value="activities" />
                <Select.Item label="Venues" value="venues" />
                <Select.Item label="Accommodation" value="accommodation" />
                <Select.Item label="Transportation" value="transportation" />
              </Select>

              <HStack alignItems="center" space={4}>
                <Text>Draft</Text>
                <Switch
                  value={values[EVENT_FORM_FIELD_NAMES.State] === 'published'}
                  onToggle={value => {
                    setFieldValue('state', value ? 'published' : 'draft')
                  }}
                  size="lg"
                />
                <Text>Publish</Text>
              </HStack>

              <Button
                onPress={() => {
                  handleSubmit()
                }}
              >
                Save and go back
              </Button>

              <Button
                onPress={() => {
                  navigation.goBack()
                }}
              >
                Cancel
              </Button>

              {event.state !== 'published' && eventExists && (
                <Button
                  onPress={() => {
                    onDelete(event)
                    navigation.goBack()
                  }}
                >
                  Delete event
                </Button>
              )}
            </VStack>
          )
        }}
      </Formik>
    </ViewContainer>
  )
}
