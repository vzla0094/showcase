import { createIcon } from 'native-base'
import { G, Path } from 'react-native-svg'

import { ICustomIconProps } from '../types'

export const SlidersIcon = ({
  color = '#000',
  size = 24,
}: ICustomIconProps) => {
  const Icon = createIcon({
    viewBox: `0 0 24 24`,
    path: (
      <G fill="none">
        <Path stroke={color} strokeLinecap="round" d="M11.5 8.5V4.5" />
        <Path stroke={color} strokeLinecap="round" d="M6.5 14.5V18.5" />
        <Path
          stroke={color}
          strokeLinecap="round"
          d="M16.5 16.4998L16.5 18.5"
        />
        <Path stroke={color} strokeLinecap="round" d="M11.5 18.5V12.5" />
        <Path stroke={color} strokeLinecap="round" d="M6.5 6.5V10.5" />
        <Path stroke={color} strokeLinecap="round" d="M16.5 4.5V12.5" />
        <Path stroke={color} strokeLinecap="round" d="M9.5 8.5L13.5 8.5" />
        <Path stroke={color} strokeLinecap="round" d="M4.5 14.5L8.5 14.5" />
        <Path stroke={color} strokeLinecap="round" d="M14.5 16.5H18.5" />
      </G>
    ),
  })

  return <Icon size={size} />
}
