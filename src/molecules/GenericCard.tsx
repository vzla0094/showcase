import { ShowMoreCard, ShowMoreCardProps } from './ShowMoreCard'
import { EventCard } from './EventCard'

import { IEvent } from '../types'

type GenericCardProps = IEvent | ShowMoreCardProps

function isShowMoreCard(props: GenericCardProps): props is ShowMoreCardProps {
  return 'showMore' in props && props.showMore
}

function isEventCard(props: GenericCardProps): props is IEvent {
  return !('showMore' in props)
}

export const GenericCard = (props: GenericCardProps) => {
  if (isShowMoreCard(props)) return <ShowMoreCard {...props} />
  if (isEventCard(props)) return <EventCard event={props} />

  return null
}
