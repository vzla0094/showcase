import * as yup from 'yup'

import { ViewContainer } from '../atoms/ViewContainer'

import { FirebaseInput } from '../firebaseComponents/FirebaseInput'
import { useAppDispatch, useAppSelector } from '../hooks'
import { editEvent } from '../redux/slices/events'

import {
  CompanyStackScreenProps,
  EVENT_FIELD_NAMES,
  EventValuesType,
  IFirebaseInputField,
} from '../types'
import { Button } from 'native-base'

export const EditEventScreen = ({
  route,
}: CompanyStackScreenProps<'EditEvent'>) => {
  const event = useAppSelector(({ events }) =>
    events.events.find(({ id }) => route.params.id === id)
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

  const dispatch = useAppDispatch()

  const handleSubmit = ({
    fieldKey,
    value,
  }: IFirebaseInputField<EVENT_FIELD_NAMES | 'state', string>) => {
    dispatch(editEvent({ id: route.params.id, data: { [fieldKey]: value } }))
  }

  return (
    <ViewContainer alignment="stretch">
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
    </ViewContainer>
  )
}
