import { ReactNode } from 'react'
import { IPressableProps, Pressable, Text, useTheme } from 'native-base'
import { IconProps } from 'phosphor-react-native'

export interface IChipIcon<T>
  extends Omit<IPressableProps, 'onPress' | 'children'> {
  active?: boolean
  icon: (props: IconProps) => ReactNode
  children: T
  onPress?: (name: T) => void
}

export const ChipIcon = <T extends ReactNode>({
  active = false,
  icon,
  children,
  onPress,
  ...props
}: IChipIcon<T>) => {
  const { colors } = useTheme()

  const bg = active ? colors.tertiary['400'] : 'white'
  const color = active ? colors.white : colors.darkText

  return (
    <Pressable
      flexDirection="row"
      alignItems="center"
      p={3}
      bg={bg}
      rounded="full"
      alignSelf="flex-start"
      onPress={() => onPress?.(children)}
      {...props}
    >
      {icon({
        size: 24,
        color,
        weight: active ? 'regular' : 'thin',
      })}
      <Text
        ml={2}
        variant="description"
        color={color}
        fontWeight={active ? 'semibold' : 'regular'}
        textTransform="capitalize"
      >
        {children}
      </Text>
    </Pressable>
  )
}
