import { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from './redux/store'
import { FBGetEvent } from '../firebase'

import { IEvent } from './types'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useEvent = (eventId: IEvent['id']) => {
  const [event, setEvent] = useState<IEvent>()

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await FBGetEvent(eventId)
      setEvent(data)
    }

    fetchEvent()
  }, [])

  return event
}
