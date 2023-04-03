import { Dimensions } from 'react-native'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Box,
  Button,
  Heading,
  IconButton,
  Image,
  ScrollView,
  Text,
  useTheme,
} from 'native-base'
import { WebView } from 'react-native-webview'
import { CaretLeft, PencilSimple } from 'phosphor-react-native'

import { getAddressQuery } from '../firebase'

import { DateSlot } from '../molecules/DateSlot'
import { EventCategory } from '../molecules/EventCategory'
import { PriceTag } from '../atoms/PriceTag'
import { ViewContainer } from '../atoms/ViewContainer'

import { CompanyStackScreenProps, IActiveEventState } from '../types'

interface ICompanyEventDetailsProps {
  activeEvent: IActiveEventState
}

export const CompanyEventDetailsView = ({
  activeEvent,
}: ICompanyEventDetailsProps) => {
  const navigation =
    useNavigation<CompanyStackScreenProps<'Event'>['navigation']>()
  const { name, category, description, startDateTime, image } =
    activeEvent.event
  const { colors, space } = useTheme()

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          onPress={() => navigation.goBack()}
          icon={<CaretLeft color={colors.lightText} size={24} />}
        />
      ),
      headerRight: () => (
        <IconButton
          onPress={() => {
            navigation.setParams({
              activeView: 'EventEditDetails',
            })
          }}
          icon={<PencilSimple color={colors.lightText} size={24} />}
        />
      ),
      title: name,
    })
  }, [navigation, activeEvent])

  const addressQuery = getAddressQuery(activeEvent.event)

  const imageSpacingX = 2
  const imageSize = Dimensions.get('window').width - space[imageSpacingX] * 2

  return (
    <ScrollView flex={1}>
      <Image
        rounded="md"
        mx={imageSpacingX}
        mt={5}
        flex={1}
        width={imageSize}
        height={imageSize}
        src={image.uri}
        alt={image.alt}
      />

      <ViewContainer alignItems="stretch">
        <Box mb={6} justifyContent="space-between" flexDirection="row">
          <Box>
            <Heading color="tertiary.400">{name}</Heading>
            <EventCategory category={category} />
          </Box>
          {/*TODO: Determine ticketType price to be shown?*/}
          <PriceTag price={100} />
        </Box>

        <DateSlot mb={8} dateStamp={startDateTime} />

        <Text mb={6} fontSize="md">
          {description}
        </Text>

        <WebView
          height={300}
          style={{ height: 300, marginBottom: space['8'] }}
          source={{
            html: `
            <iframe
              width='100%'
              height='100%'
              style='border:0'
              loading='lazy'
              allowfullscreen
              referrerpolicy='no-referrer-when-downgrade'
              src='https://www.google.com/maps/embed/v1/place?key=AIzaSyAhWL-VE6px-42zW-veEUddTpIstjtxzJM
                &q=${addressQuery}'>
            </iframe>
          `,
          }}
        />

        <Button onPress={() => navigation.navigate('TicketTypes')}>
          Redemptions
        </Button>
      </ViewContainer>
    </ScrollView>
  )
}
