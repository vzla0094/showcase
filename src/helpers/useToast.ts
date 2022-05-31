import { useToast as NBUseToast, IToastProps } from 'native-base'

interface IShowArgs {
  description: IToastProps['description']
  variant?: 'success' | 'error' | 'warning' | 'info'
}

interface IToast {
  show: (args: IShowArgs) => void
}

export const useToast = (): IToast => {
  const toast = NBUseToast()

  return {
    ...toast,
    show: ({ description, variant = 'info' }) => {
      toast.show({
        description,
        bg: `${variant}.400`,
        _description: { color: 'black' },
        placement: 'top',
      })
    },
  }
}
