import { createIcon } from 'native-base'
import { Circle, G, Path } from 'react-native-svg'

import { ICustomIconProps } from '../types'

export const UserIcon = ({ color = '#000', size = 24 }: ICustomIconProps) => {
  const Icon = createIcon({
    viewBox: `0 0 24 24`,
    path: (
      <G fill="none">
        <Circle stroke={color} cx="12" cy="8" r="3.5" strokeLinecap="round" />
        <Path
          stroke={color}
          d="M4.84913 16.9479C5.48883 14.6034 7.91473 13.5 10.345 13.5H13.655C16.0853 13.5 18.5112 14.6034 19.1509 16.9479C19.282 17.4287 19.3868 17.9489 19.4462 18.5015C19.5052 19.0507 19.0523 19.5 18.5 19.5H5.5C4.94772 19.5 4.49482 19.0507 4.55382 18.5015C4.6132 17.9489 4.71796 17.4287 4.84913 16.9479Z"
          strokeLinecap="round"
        />
      </G>
    ),
  })

  return <Icon size={size} />
}
