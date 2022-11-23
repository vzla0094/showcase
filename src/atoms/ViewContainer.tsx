import { ReactNode } from 'react'
import { Center, Container, ScrollView } from 'native-base'

interface IViewContainerProps {
  children: ReactNode
  verticalCenterContent?: boolean
  alignment?: 'start' | 'center' | 'stretch'
  scroll?: boolean
}

export const ViewContainer = ({
  children,
  verticalCenterContent = false,
  alignment = 'center',
  scroll = false,
}: IViewContainerProps) => {
  const ContainedChildren = (
    <Center flex={1}>
      <Container
        safeArea
        flex={1}
        w={'100%'}
        justifyContent={verticalCenterContent ? 'center' : 'auto'}
        alignItems={alignment}
      >
        {children}
      </Container>
    </Center>
  )

  return scroll ? (
    <ScrollView>{ContainedChildren}</ScrollView>
  ) : (
    ContainedChildren
  )
}
