import { ReactNode } from 'react'
import {
  Box,
  Heading,
  IContainerProps,
  ScrollView,
  useSafeArea,
} from 'native-base'

interface IViewContainerProps {
  children: ReactNode
  justifyContent?: IContainerProps['justifyContent']
  alignItems?: 'start' | 'center' | 'stretch'
  scroll?: boolean
  safeArea?: boolean
  title?: string
}

export const ViewContainer = ({
  children,
  justifyContent = 'auto',
  alignItems = 'center',
  scroll = false,
  safeArea = false,
  title,
}: IViewContainerProps) => {
  const { pt: safeAreaValue } = useSafeArea({ safeAreaTop: safeArea })

  const optionalProps = {
    alignItems,
    ...(justifyContent === 'auto' ? {} : { justifyContent }),
  }

  const ContainedChildren = (
    <Box
      flex={1}
      bg="white"
      rounded="xl"
      mt={safeArea && safeAreaValue}
      m={2}
      px={5}
      py={4}
      {...optionalProps}
    >
      {title && <Heading mb={4}>{title}</Heading>}
      {children}
    </Box>
  )

  return scroll ? (
    <ScrollView>{ContainedChildren}</ScrollView>
  ) : (
    ContainedChildren
  )
}
