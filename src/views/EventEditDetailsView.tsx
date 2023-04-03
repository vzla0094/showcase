import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Radio,
  Switch,
  Text,
  VStack,
} from 'native-base'
import { Formik, FormikProps, FormikValues } from 'formik'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'

import { ImagePicker } from '../molecules/ImagePicker'
import { FormikInputDate } from '../molecules/FormikInputDate'
import { ViewContainer } from '../atoms/ViewContainer'
import { FormikInput } from '../atoms/FormikInput'

import { useMediaLibrary } from '../hooks/useMediaLibrary'

import {
  CompanyStackScreenProps,
  EVENT_FORM_FIELD_NAMES,
  EventFormValuesType,
  IEvent,
  VIEW_CONTAINER_SPACING,
} from '../types'

export interface IOnSubmitPayload {
  prevEvent?: IEvent
  event: IEvent
}

interface IEventEditDetailsViewProps {
  event: IEvent
  onSubmit: (payload: IOnSubmitPayload) => void
  onDelete: (event: IEvent) => void
}

export const EventEditDetailsView = ({
  event,
  onSubmit,
  onDelete,
}: IEventEditDetailsViewProps) => {
  const navigation =
    useNavigation<CompanyStackScreenProps<'Event'>['navigation']>()
  const formikRef = useRef<FormikProps<FormikValues>>(null)
  const eventExists = Boolean(event?.id)

  const [loadingImage, setLoadingImage] = useState(false)

  const { getPhotoFromMediaLibrary } = useMediaLibrary()

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
    category: event.category,
    state: event.state,
    streetAddress: event.streetAddress,
    city: event.city,
    stateProvince: event.stateProvince,
    country: event.country,
    zipCode: event.zipCode,
    startDateTime: event.startDateTime,
    endDateTime: event.endDateTime,
    image: event.image,
  }

  const baseSpacingUnit = 4
  const spacingX =
    (VIEW_CONTAINER_SPACING.OUTER_PADDING +
      VIEW_CONTAINER_SPACING.INNER_PADDING) *
    baseSpacingUnit *
    2

  const imageSize = Dimensions.get('window').width - spacingX

  return (
    <ViewContainer alignItems="stretch" scroll>
      <Heading mb={2}>Event details</Heading>
      <Text mb={4}>These are de details for your event</Text>
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
          const handleImagePickerPress = async () => {
            setLoadingImage(true)
            const image = await getPhotoFromMediaLibrary()
            setFieldValue('image.uri', image.assets?.[0].uri)
            setLoadingImage(false)
          }

          return (
            <VStack space={4}>
              <FormikInput
                key={EVENT_FORM_FIELD_NAMES.Name}
                value={values[EVENT_FORM_FIELD_NAMES.Name]}
                fieldName={EVENT_FORM_FIELD_NAMES.Name}
                handleBlur={handleBlur(EVENT_FORM_FIELD_NAMES.Name)}
                handleChange={handleChange(EVENT_FORM_FIELD_NAMES.Name)}
                errors={errors}
                label="Name"
              />

              <FormControl>
                <FormControl.Label>Category</FormControl.Label>
                <Radio.Group
                  name="category"
                  accessibilityLabel="category"
                  value={values[EVENT_FORM_FIELD_NAMES.Category]}
                  onChange={nextValue => setFieldValue('category', nextValue)}
                >
                  <HStack flexWrap="wrap" space={2}>
                    <Radio my={1} value="food">
                      Food
                    </Radio>
                    <Radio my={1} value="activities">
                      Activities
                    </Radio>
                    <Radio my={1} value="venues">
                      Venues
                    </Radio>
                    <Radio my={1} value="accommodation">
                      Accommodation
                    </Radio>
                    <Radio my={1} value="transportation">
                      Transportation
                    </Radio>
                  </HStack>
                </Radio.Group>
              </FormControl>

              <FormikInput
                key={EVENT_FORM_FIELD_NAMES.Description}
                value={values[EVENT_FORM_FIELD_NAMES.Description]}
                fieldName={EVENT_FORM_FIELD_NAMES.Description}
                handleBlur={handleBlur(EVENT_FORM_FIELD_NAMES.Description)}
                handleChange={handleChange(EVENT_FORM_FIELD_NAMES.Description)}
                errors={errors}
                label="Description"
                inputProps={{ multiline: true }}
              />

              <FormikInputDate
                value={values[EVENT_FORM_FIELD_NAMES.StartDateTime]}
                fieldName={EVENT_FORM_FIELD_NAMES.StartDateTime}
                handleChange={handleChange(
                  EVENT_FORM_FIELD_NAMES.StartDateTime
                )}
                errors={errors}
                label="Start date"
              />

              <FormikInputDate
                value={values[EVENT_FORM_FIELD_NAMES.EndDateTime]}
                fieldName={EVENT_FORM_FIELD_NAMES.EndDateTime}
                handleChange={handleChange(EVENT_FORM_FIELD_NAMES.EndDateTime)}
                errors={errors}
                label="End date"
              />

              <FormikInput
                key={EVENT_FORM_FIELD_NAMES.StreetAddress}
                value={values[EVENT_FORM_FIELD_NAMES.StreetAddress]}
                fieldName={EVENT_FORM_FIELD_NAMES.StreetAddress}
                handleBlur={handleBlur(EVENT_FORM_FIELD_NAMES.StreetAddress)}
                handleChange={handleChange(
                  EVENT_FORM_FIELD_NAMES.StreetAddress
                )}
                errors={errors}
                label="Street Address"
              />

              <Box flexDirection="row">
                <FormikInput
                  key={EVENT_FORM_FIELD_NAMES.City}
                  value={values[EVENT_FORM_FIELD_NAMES.City]}
                  fieldName={EVENT_FORM_FIELD_NAMES.City}
                  handleBlur={handleBlur(EVENT_FORM_FIELD_NAMES.City)}
                  handleChange={handleChange(EVENT_FORM_FIELD_NAMES.City)}
                  errors={errors}
                  label="City"
                  containerProps={{ flex: 1, mr: 2 }}
                />

                <FormikInput
                  key={EVENT_FORM_FIELD_NAMES.StateProvince}
                  value={values[EVENT_FORM_FIELD_NAMES.StateProvince]}
                  fieldName={EVENT_FORM_FIELD_NAMES.StateProvince}
                  handleBlur={handleBlur(EVENT_FORM_FIELD_NAMES.StateProvince)}
                  handleChange={handleChange(
                    EVENT_FORM_FIELD_NAMES.StateProvince
                  )}
                  errors={errors}
                  label="State"
                  containerProps={{ flex: 1, ml: 2 }}
                />
              </Box>

              <FormikInput
                key={EVENT_FORM_FIELD_NAMES.Country}
                value={values[EVENT_FORM_FIELD_NAMES.Country]}
                fieldName={EVENT_FORM_FIELD_NAMES.Country}
                handleBlur={handleBlur(EVENT_FORM_FIELD_NAMES.Country)}
                handleChange={handleChange(EVENT_FORM_FIELD_NAMES.Country)}
                errors={errors}
                label="Country"
              />

              <FormikInput
                key={EVENT_FORM_FIELD_NAMES.ZipCode}
                value={values[EVENT_FORM_FIELD_NAMES.ZipCode]}
                fieldName={EVENT_FORM_FIELD_NAMES.ZipCode}
                handleBlur={handleBlur(EVENT_FORM_FIELD_NAMES.ZipCode)}
                handleChange={handleChange(EVENT_FORM_FIELD_NAMES.ZipCode)}
                errors={errors}
                label="Zip Code"
              />

              <ImagePicker
                placeholder={'upload image'}
                height={imageSize}
                onPress={handleImagePickerPress}
                uri={values.image.uri}
                loading={loadingImage}
              />

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
