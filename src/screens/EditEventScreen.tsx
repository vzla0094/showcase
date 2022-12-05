import { Select, VStack, Button } from 'native-base'
import * as yup from 'yup'

import { ViewContainer } from '../atoms/ViewContainer'
import { FirebaseInput } from '../firebaseComponents/FirebaseInput'

import { useAppSelector } from '../hooks'

import { FBEditEvent } from '../../firebase'

import {
  CompanyStackScreenProps,
  EVENT_FIELD_NAMES,
  EventValuesType,
  IFirebaseInputField,
} from '../types'

export const EditEventScreen = ({
  route,
}: CompanyStackScreenProps<'EditEvent'>) => {
  const event = useAppSelector(({ events }) =>
    events.allEvents.find(({ id }) => route.params.id === id)
  )

  if (!event) return null

  const eventFields = [
    { name: EVENT_FIELD_NAMES.Name, label: 'Event name' },
    { name: EVENT_FIELD_NAMES.Description, label: 'Description' },
  ]

  const initialValues: EventValuesType = {
    name: event.name,
    description: event.description,
  }

  const handleSubmit = async ({
    fieldKey,
    value,
  }: IFirebaseInputField<EVENT_FIELD_NAMES | 'state' | 'category', string>) => {
    await FBEditEvent({ id: route.params.id, data: { [fieldKey]: value } })
  }

  return (
    <ViewContainer alignment="stretch">
      <VStack space="sm">
        {eventFields.map(({ name, label }) => (
          <FirebaseInput<EVENT_FIELD_NAMES, string>
            fieldKey={name}
            validationSchema={yup.string()}
            onSubmit={handleSubmit}
            label={label}
            key={name}
            initialValue={initialValues[name]}
          />
        ))}

        <Select
          placeholder="Select a category"
          selectedValue={event.category}
          onValueChange={value => handleSubmit({ fieldKey: 'category', value })}
        >
          <Select.Item label="Food" value="food" />
          <Select.Item label="Activities" value="activities" />
          <Select.Item label="Events" value="events" />
          <Select.Item label="Accommodation" value="accommodation" />
          <Select.Item label="Transportation" value="transportation" />
        </Select>
        {event.state === 'draft' && (
          <Button
            onPress={() =>
              handleSubmit({
                fieldKey: 'state',
                value: 'published',
              })
            }
          >
            Publish
          </Button>
        )}
      </VStack>
    </ViewContainer>
  )
}
