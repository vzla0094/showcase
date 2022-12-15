import { ReactNode } from 'react'
import { Center, Container, ScrollView, IContainerProps } from 'native-base'

interface IViewContainerProps {
  children: ReactNode
  justifyContent?: IContainerProps['justifyContent']
  alignItems?: 'start' | 'center' | 'stretch'
  scroll?: boolean
}

export const ViewContainer = ({
  children,
  justifyContent = 'auto',
  alignItems = 'center',
  scroll = false,
}: IViewContainerProps) => {
  const ContainedChildren = (
    <Center flex={1}>
      <Container
        safeArea
        flex={1}
        w={'100%'}
        justifyContent={justifyContent}
        alignItems={alignItems}
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
