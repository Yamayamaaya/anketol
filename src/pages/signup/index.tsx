import {
  Box,
  Button,
  Center,
  chakra,
  Container,
  Grid,
  Heading,
  Spacer,
} from '@chakra-ui/react'
import { signInWithGoogle } from '@src/lib/firebase/firebase'

export const Page = () => {
  return (
    <Container py={14}>
      <Heading>サインアップ</Heading>
      <chakra.form>
        <Spacer height={8} aria-hidden />
        <Grid gap={4}>
          <Box display={'contents'}>
            <Center>
              <Button onClick={signInWithGoogle}>Googleでサインイン</Button>
            </Center>
          </Box>
        </Grid>
        <Spacer height={4} aria-hidden />
      </chakra.form>
    </Container>
  )
}

export default Page
