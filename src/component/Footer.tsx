import { chakra, Container } from '@chakra-ui/react'

export const Footer = () => {
  return (
    <chakra.footer py={4} bgColor={'#FF9A00'} color={'white'}>
      <Container maxW={'container.lg'}>
        <p className="text-center text-white">© 2023 Yamayamaaya</p>
      </Container>
    </chakra.footer>
  )
}
