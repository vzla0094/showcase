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
  const prop = justifyContent === 'auto' ? {} : { justifyContent }
  const ContainedChildren = (
    <Center flex={1}>
      <Container safeArea flex={1} w={'100%'} alignItems={alignItems} {...prop}>
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
