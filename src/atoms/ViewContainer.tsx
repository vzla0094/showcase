import { ReactNode } from 'react'
import { Center, Container } from 'native-base'

interface IViewContainerProps {
  children: ReactNode
  verticalCenterContent?: boolean
  alignment?: 'start' | 'center' | 'stretch'
}

export const ViewContainer = ({
  children,
  verticalCenterContent = false,
  alignment = 'center',
}: IViewContainerProps) => (
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
