import { ReactNode } from 'react'
import { Center, Container } from 'native-base'

interface IViewContainerProps {
  children: ReactNode
  horizontalCenterContent?: boolean
  verticalCenterContent?: boolean
}

export const ViewContainer = ({
  children,
  horizontalCenterContent = true,
  verticalCenterContent = false,
}: IViewContainerProps) => (
  <Center flex={1}>
    <Container
      centerContent={horizontalCenterContent}
      safeArea
      flex={1}
      w={'100%'}
      justifyContent={verticalCenterContent ? 'center' : 'auto'}
    >
      {children}
    </Container>
  </Center>
)
