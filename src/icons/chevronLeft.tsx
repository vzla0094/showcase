import { createIcon } from 'native-base'
import { G, Path } from 'react-native-svg'

import { ICustomIconProps } from '../types'

export const ChevronLeftIcon = ({
  color = '#000',
  size = 24,
}: ICustomIconProps) => {
  const Icon = createIcon({
    viewBox: `0 0 24 24`,
    path: (
      <G fill="none">
        <Path stroke={color} d="M13.5 9L10.5 12L13.5 15" />
      </G>
    ),
  })

  return <Icon size={size} />
}
