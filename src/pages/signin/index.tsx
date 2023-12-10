import {
  Box,
  Button,
  Center,
  chakra,
  Container,
  Grid,
  Heading,
  Spacer,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FirebaseError } from '@firebase/util'
import { useRouter } from '@src/hooks/useRouter/useRouter'
import { signInWithGoogle } from '@src/lib/firebase/firebase'

export const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const { push } = useRouter()

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithGoogle()
      toast({
        title: 'ログインしました。',
        status: 'success',
        position: 'top',
      })
      push((path) => path.$url())
    } catch (e) {
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      })
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container py={14}>
      <Heading>サインイン</Heading>
      <chakra.form>
        <Spacer height={8} aria-hidden />
        <Grid gap={4}>
          <Box display={'contents'}>
            <Center>
              <Button
                onClick={handleGoogleSignIn}
                isLoading={isLoading}
                className="flex items-center gap-2"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                  width="20"
                  height="20"
                />
                <p>Googleでサインイン</p>
              </Button>
            </Center>
          </Box>
        </Grid>
        <Spacer height={4} aria-hidden />
      </chakra.form>
    </Container>
  )
}

export default Page
