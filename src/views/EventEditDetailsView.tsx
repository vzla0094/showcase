import { ViewContainer } from '../atoms/ViewContainer'
import { Heading, IconButton, Select, VStack } from 'native-base'
import { Formik, FormikProps, FormikValues } from 'formik'
import { FormikInput } from '../atoms/FormikInput'
import {
  CompanyStackScreenProps,
  EVENT_FIELD_NAMES,
  EventValuesType,
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
      headerRight: () => null,
    })
  }, [navigation])

  if (!event) return null

  const initialValues: EventValuesType = {
    name: event.name,
    description: event.description,
    address: event.address,
  }

  const eventFields = [
    { name: EVENT_FIELD_NAMES.Name, label: 'Event name' },
    { name: EVENT_FIELD_NAMES.Description, label: 'Description' },
    { name: EVENT_FIELD_NAMES.Address, label: 'Address' },
  ]

  return (
    <ViewContainer alignItems="stretch">
      <Heading>Edit Event</Heading>
      <Formik
        initialValues={{ ...initialValues, category: event.category }}
        onSubmit={values => {
          onSubmit(event, { ...event, ...values })
        }}
        innerRef={formikRef}
      >
        {({ values, handleChange, handleBlur, errors, setFieldValue }) => {
          return (
            <VStack space={2}>
              {eventFields.map(({ name, label }) => {
                return (
                  <FormikInput
                    key={name}
                    value={values[name]}
                    fieldName={name}
                    handleBlur={handleBlur(name)}
                    handleChange={handleChange(name)}
                    errors={errors}
                    label={label}
                  />
                )
              })}
              <Select
                placeholder="Select a category"
                selectedValue={values.category}
                onValueChange={value => setFieldValue('category', value)}
              >
                <Select.Item label="Food" value="food" />
                <Select.Item label="Activities" value="activities" />
                <Select.Item label="Venues" value="venues" />
                <Select.Item label="Accommodation" value="accommodation" />
                <Select.Item label="Transportation" value="transportation" />
              </Select>
            </VStack>
          )
        }}
      </Formik>
    </ViewContainer>
  )
}
