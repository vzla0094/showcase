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
import { useSigninOrLoginMutation } from '../redux/services/auth'
import { IAuth } from '../types'
import { useToast } from '../helpers/useToast'

export const LoginOrRegisterScreen = () => {
  const { errors, validate, cleanError } = useValidations()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const toast = useToast()
  const [login] = useSigninOrLoginMutation()

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

  const handleRegisterPress = async (auth: IAuth) => {
    if (Object.keys(errors).length) {
      toast.show({
        description: 'Please complete all fields properly',
        variant: 'error',
      })
      return
    }

    try {
      await login(auth).unwrap()
    } catch (e) {
      toast.show({
        description: e.message,
        variant: 'error',
      })
      console.error('Error registering: ', e)
    }
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
              autoCapitalize="none"
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
        <Button
          onPress={() =>
            handleRegisterPress({ authType: 'register', email, password })
          }
        >
          Register
        </Button>
      </Container>
    </Center>
  )
}
