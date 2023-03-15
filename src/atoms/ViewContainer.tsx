import { ReactNode } from 'react'
import {
  Box,
  Heading,
  IBoxProps,
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
  flex?: IBoxProps['flex']
  flexGrow?: IBoxProps['flexGrow']
}

export const ViewContainer = ({
  children,
  justifyContent = 'auto',
  alignItems = 'center',
  scroll = false,
  safeArea = false,
  title,
  flex = 1,
  flexGrow,
}: IViewContainerProps) => {
  const { pt } = useSafeArea({ safeAreaTop: safeArea })

  const optionalProps = {
    alignItems,
    ...(justifyContent === 'auto' ? {} : { justifyContent }),
  }

  const ContainedChildren = (
    // TODO: remove pt={5} when react-navigation fixes the header height issue
    // https://github.com/react-navigation/react-navigation/issues/10097
    <Box bg="red" flex={flex} p={2} pt={safeArea ? pt : 5}>
      <Box
        flex={flex}
        flexGrow={flexGrow}
        bg="white"
        rounded="xl"
        p={5}
        {...optionalProps}
      >
        {title && <Heading mb={4}>{title}</Heading>}
        {children}
      </Box>
    </Box>
  )

  return scroll ? (
    <ScrollView>{ContainedChildren}</ScrollView>
  ) : (
    ContainedChildren
  )
}
