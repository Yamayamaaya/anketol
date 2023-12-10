import {
  Avatar,
  Button,
  chakra,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { FirebaseError } from '@firebase/util'
import { getAuth, signOut } from 'firebase/auth'
import { Navigate } from '@src/component/Navigate'
import { useRouter } from '@src/hooks/useRouter/useRouter'
import Image from 'next/image'

export const Header = () => {
  const { user } = useAuthContext()
  const toast = useToast()
  const { push } = useRouter()

  const handleSignOut = async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
      toast({
        title: 'ログアウトしました。',
        status: 'success',
        position: 'top',
      })
      push((path) => path.signin.$url())
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    }
  }

  return (
    <chakra.header py={4} bgColor={'#FF9A00'}>
      <div className="flex items-center justify-between w-full px-8">
        <Navigate href={(path) => path.$url()}>
          <chakra.a
            _hover={{
              opacity: 0.8,
            }}
          >
            <Image
              src={'/logo_reverse.svg'}
              alt={'アンケトル'}
              width={200}
              height={50}
            />
          </chakra.a>
        </Navigate>
        {user ? (
          <Menu>
            <MenuButton>
              <Avatar flexShrink={0} width={10} height={10} />
            </MenuButton>
            <MenuList py={0}>
              <MenuItem onClick={handleSignOut}>サインアウト</MenuItem>
              <MenuItem onClick={() => push((path) => path.mypage.$url())}>
                マイページ
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Navigate href={(path) => path.signin.$url()}>
            <Button as={'a'} colorScheme={'teal'}>
              サインイン
            </Button>
          </Navigate>
        )}
      </div>
    </chakra.header>
  )
}
