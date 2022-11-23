import * as yup from 'yup'

import { ViewContainer } from '../atoms/ViewContainer'
import {
  CompanyStackScreenProps,
  EVENT_FIELD_NAMES,
  EventValuesType,
  IFirebaseInputField,
} from '../types'
import { FirebaseInput } from '../firebaseComponents/FirebaseInput'
import { useAppDispatch } from '../hooks'
import { editEvent } from '../redux/slices/events'

export const CreateEventScreen = ({
  route,
}: CompanyStackScreenProps<'CreateEvent'>) => {
  const eventFields = [
    { name: EVENT_FIELD_NAMES.EventName, label: 'Event name' },
    { name: EVENT_FIELD_NAMES.Description, label: 'Description' },
  ]

  const initialValues: EventValuesType = {
    eventName: '',
    description: '',
  }

  const dispatch = useAppDispatch()

  const handleSubmit = ({ fieldKey, value }: IFirebaseInputField) => {
    dispatch(
      editEvent({ id: route.params.eventId, data: { [fieldKey]: value } })
    )
  }

  return (
    <ViewContainer alignment="stretch">
      {eventFields.map(({ name, label }) => (
        <FirebaseInput
          fieldKey={name}
          validationSchema={yup.string()}
          onSubmit={handleSubmit}
          label={label}
          key={name}
          initialValue={initialValues[name]}
        />
      ))}
    </ViewContainer>
  )
}
