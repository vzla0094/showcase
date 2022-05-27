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

export const LoginOrRegisterScreen = () => {
  const { errors, validate, cleanError } = useValidations()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

  const handlePasswordBlur = (password: string) => {
    validate({
      passwordLength: createValidation => {
        createValidation({
          validator: () => password?.length > 6,
          errorMessage: 'Password should have more than 6 characters',
          showToast: false,
        })
      },
    })
  }

  const handleEmailChange = (text: string) => {
    setEmail(text)
    cleanError('requireEmail')
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text)
    cleanError('passwordLength')
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
            />
            {'requireEmail' in errors ? (
              <FormControl.ErrorMessage>
                {errors.requireEmail}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isInvalid={'passwordLength' in errors}>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={handlePasswordChange}
              onBlur={() => handlePasswordBlur(password)}
            />
            {'passwordLength' in errors ? (
              <FormControl.ErrorMessage>
                {errors.passwordLength}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
        </Stack>
        <Button>Register</Button>
      </Container>
    </Center>
  )
}
