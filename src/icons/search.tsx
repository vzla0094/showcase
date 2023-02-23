import { createIcon } from 'native-base'
import { Circle, G, Path } from 'react-native-svg'

import { ICustomIconProps } from '../types'

export const SearchIcon = ({ color = '#000', size = 24 }: ICustomIconProps) => {
  const Icon = createIcon({
    viewBox: `0 0 24 24`,
    path: (
      <G fill="none">
        <Circle stroke={color} cx="11" cy="11" r="6" />
        <Path stroke={color} strokeLinecap="round" d="M20 20L17 17" />
      </G>
    ),
  })

  return <Icon size={size} />
}
