import { ViewContainer } from '../atoms/ViewContainer'
import { Button, Heading, IconButton, Select, VStack } from 'native-base'
import { Formik, FormikProps, FormikValues } from 'formik'
import { FormikInput } from '../atoms/FormikInput'
import {
  CompanyStackScreenProps,
  EVENT_FORM_FIELD_NAMES,
  EventFormValuesType,
  IEvent,
} from '../types'
import { useEffect, useRef } from 'react'
import { FontAwesome } from '@expo/vector-icons'

interface IEventEditDetailsViewProps {
  event?: IEvent
  onSubmit: (prevEvent: IEvent, newEvent: IEvent) => void
  navigation: CompanyStackScreenProps<'Event'>['navigation']
}

export const EventEditDetailsView = ({
  event,
  onSubmit,
  navigation,
}: IEventEditDetailsViewProps) => {
  const formikRef = useRef<FormikProps<FormikValues>>(null)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          onPress={() => {
            if (formikRef.current) formikRef.current.handleSubmit()
            navigation.setParams({ activeView: 'EventDetails' })
          }}
          _icon={{
            as: FontAwesome,
            name: 'chevron-left',
          }}
        />
      ),
      // useEffect doesn't like returning null here for hiding the button,
      // adding a display="none" instead fixes the warning
      headerRight: () => <IconButton display="none" />,
    })
  }, [navigation])

  if (!event) return null

  const initialValues: EventFormValuesType = {
    name: event.name,
    description: event.description,
    address: event.address,
    category: event.category,
    state: event.state,
  }

  return (
    <ViewContainer alignItems="stretch">
      <Heading>Edit Event</Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          onSubmit(event, { ...event, ...values })
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
            <VStack space={2}>
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
              {event?.state === 'draft' && (
                <Button
                  onPress={() => {
                    setFieldValue('state', 'published')
                    handleSubmit()
                  }}
                >
                  Publish
                </Button>
              )}
            </VStack>
          )
        }}
      </Formik>
    </ViewContainer>
  )
}
