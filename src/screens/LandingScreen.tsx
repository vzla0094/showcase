import { Square, Container, Heading, Pressable, Center } from 'native-base'
import { FC } from 'react'
import { RootStackScreenProps } from '../types'

export const LandingScreen: FC<RootStackScreenProps<'Landing'>> = () => (
  <Center flex={1}>
    <Container>
      <Pressable>
        <Square bg={'gray.400'} w="300" h="300" mb={10} shadow={3}>
          <Heading>Promote your business</Heading>
        </Square>
      </Pressable>
      <Pressable>
        <Square bg={'gray.400'} w="300" h="300" shadow={3}>
          <Heading>Looking for deals?</Heading>
        </Square>
      </Pressable>
    </Container>
  </Center>
)
