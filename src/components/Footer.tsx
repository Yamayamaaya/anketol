import { chakra, Container } from '@chakra-ui/react'

interface FooterProps {
  isSignInOrUpPage?: boolean
}

export const Footer: React.FC<FooterProps> = ({ isSignInOrUpPage }) => {
  return (
    <chakra.footer
      py={4}
      bgColor={'#FF9A00'}
      color={'white'}
      className={`bottom-0 z-50 ${isSignInOrUpPage ? 'md:w-[40%]' : ''} left-0`}
    >
      <Container maxW={'container.lg'}>
        <p className="text-center text-white">© 2023 Yamayamaaya</p>
      </Container>
    </chakra.footer>
  )
}
