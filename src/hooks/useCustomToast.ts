import { useToast, ToastPosition } from '@chakra-ui/react'

export const useCustomToast = () => {
  const toast = useToast()
  return (
    status: 'info' | 'warning' | 'success' | 'error',
    title: string,
    description?: string,
    position: ToastPosition='top'
  ) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: position,
    })
  }
}

