import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Landing: undefined
  Questionnaire: undefined
  Dashboard: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type DealCategories =
  | 'Food'
  | 'Activities'
  | 'Events'
  | 'Stay'
  | 'Transportation'

export type ToggleButtonOnPress = (buttonValue: DealCategories) => void

export interface IDealProps {
  title: string
  description: string
}

type TimeSlot = [{ start: string; end: string }]
interface ITimeSlots {
  sunday: TimeSlot
  monday: TimeSlot
  tuesday: TimeSlot
  wednesday: TimeSlot
  thursday: TimeSlot
  friday: TimeSlot
  saturday: TimeSlot
}

interface IReview {
  uuid: string
  comment: string
  rating: string
}

export interface IDeal {
  category: string
  timeSlots?: Partial<ITimeSlots>
  dealId: string
  active: boolean
  validatedUsers: Array<string>
  title: string
  description: string
  imageGallery: Array<string>
  thumbnail: string
  coverImage: string
  startDate: string
  endDate: string
  quantityLimit: string
  reviews: Array<IReview>
}
