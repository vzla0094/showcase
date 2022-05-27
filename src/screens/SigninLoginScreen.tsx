import {
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  Input,
  Stack,
} from 'native-base'
import { useValidations } from '../helpers/useValidations'
import { useState } from 'react'

export const SigninLoginScreen = () => {
  const [errors, validate, cleanErrors] = useValidations()
  const [email, setEmail] = useState('')

  const handleEmailBlur = (email: string) => {
    // TODO: Add proper email validation
    validate({
      requireEmail: createValidation => {
        createValidation({
          validator: () => !!email,
          errorMessage: 'This is a required field',
          showToast: false,
        })
      },
    })
  }

  const handleEmailChange = (text: string) => {
    setEmail(text)
    cleanErrors()
  }

  return (
    <Center flex={1}>
      <Container
        centerContent
        safeArea
        w={'100%'}
        flex={1}
        justifyContent="center"
      >
        <Heading mb={12}>Register to Taisho</Heading>
        <Stack w="100%" mb={12} space={5}>
          <FormControl isInvalid={'requireEmail' in errors}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              type="text"
              value={email}
              onChangeText={handleEmailChange}
              onBlur={() => handleEmailBlur(email)}
            ></Input>
            {'requireEmail' in errors ? (
              <FormControl.ErrorMessage>
                {errors.requireEmail}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password"></Input>
          </FormControl>
        </Stack>
        <Button>Register</Button>
      </Container>
    </Center>
  )
}
