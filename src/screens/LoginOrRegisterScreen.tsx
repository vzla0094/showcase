import { useValidations } from '../hooks/useValidations'
import { useState } from 'react'

import { useToast } from '../hooks/useToast'
import { LoginOrRegisterView } from '../views/LoginOrRegisterView'
import { login, register } from '../redux/slices/user'
import { useAppDispatch } from '../hooks'

import { IAuth } from '../types'
import { getErrorMessage } from '../helpers/errors'

export const LoginOrRegisterScreen = () => {
  const [loginOrRegister, setLoginOrRegister] = useState<'login' | 'register'>(
    'register'
  )
  const { errors, validate, cleanError } = useValidations()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const toast = useToast()
  const dispatch = useAppDispatch()

  const handleEmailBlur = (email: string) => {
    // TODO: Add proper email validation with yup
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

  const handleSubmit = async (auth: IAuth) => {
    if (Object.keys(errors).length) {
      toast.show({
        description: 'Please complete all fields properly',
        variant: 'error',
      })
      return
    }

    try {
      loginOrRegister === 'login'
        ? dispatch(login(auth))
        : dispatch(register(auth))
    } catch (e) {
      toast.show({
        description: getErrorMessage(e),
        variant: 'error',
      })
      console.error('Error registering: ', e)
    }
  }

  return (
    <LoginOrRegisterView
      variant={loginOrRegister}
      errors={errors}
      email={email}
      onEmailChange={handleEmailChange}
      onEmailBlur={() => handleEmailBlur(email)}
      password={password}
      onPasswordChange={handlePasswordChange}
      onPasswordBlur={() => handlePasswordBlur(password)}
      onSubmit={() => handleSubmit({ email, password })}
      onChangeFormType={() =>
        setLoginOrRegister(prevState =>
          prevState === 'login' ? 'register' : 'login'
        )
      }
    />
  )
}
