import {
  Avatar,
  chakra,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { getAuth, signOut } from 'firebase/auth'
import { Navigate } from '@src/components/Navigate'
import { useRouter } from '@src/hooks/hooks/useRouter'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

interface HeaderProps {
  isSignInOrUpPage: boolean
}

export const Header: React.FC<HeaderProps> = ({ isSignInOrUpPage }) => {
  const { user } = useAuthContext()
  const toast = useToast()
  const { push } = useRouter()
  const [isOpen, setIsOpen] = useState(false)

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
      console.error('Firebase Authentication Error', e)
    }
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <chakra.header
      py={4}
      bgColor={'#FF9A00'}
      className={`sticky top-0 z-50 ${
        isSignInOrUpPage ? 'w-[40%]' : ''
      } left-0`}
    >
      <div className="flex items-center justify-between w-full px-8">
        <button onClick={handleToggle} className="w-8 h-8 text-white">
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        <Navigate href={(path) => path.$url()}>
          <chakra.a
            _hover={{
              opacity: 0.8,
            }}
          >
            {!isSignInOrUpPage && (
              <Image
                src={'/logo_reverse.svg'}
                alt={'アンケトル'}
                width={200}
                height={50}
              />
            )}
          </chakra.a>
        </Navigate>

        {user ? (
          <Menu>
            <MenuButton>
              <Avatar
                flexShrink={0}
                width={10}
                height={10}
                src={user.photoURL || 'default_image_url'}
              />
            </MenuButton>
            <MenuList py={0}>
              <h4 className="px-3 pt-2 text-sm font-semibold text-gray-700">
                {user?.displayName}
              </h4>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>サインアウト</MenuItem>
              <MenuItem onClick={() => push((path) => path.mypage.$url())}>
                マイページ
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Menu>
            {!isSignInOrUpPage && (
              <MenuButton>
                <Avatar flexShrink={0} width={10} height={10} />
              </MenuButton>
            )}
            <MenuList py={0}>
              <h4 className="px-3 pt-2 text-sm font-semibold text-gray-700">
                ゲスト
              </h4>
              <MenuDivider />
              <MenuItem onClick={() => push((path) => path.signin.$url())}>
                サインイン
              </MenuItem>
              <MenuItem onClick={() => push((path) => path.signup.$url())}>
                サインアップ
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </div>
      <Drawer isOpen={isOpen} onClose={handleToggle} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>メニュー</DrawerHeader>
          <DrawerBody className="flex flex-col items-start gap-5">
            <Navigate href={(path) => path.$url()}>
              <p className="text-gray-700 hover:text-black hover:font-semibold">
                トップページ
              </p>
            </Navigate>
            <Navigate href={(path) => path.questionnaire.$url()}>
              <p className="text-gray-700 hover:text-black hover:font-semibold">
                アンケート投稿
              </p>
            </Navigate>
            <Navigate href={(path) => path.mypage.$url()}>
              <p className="text-gray-700 hover:text-black hover:font-semibold">
                マイページ
              </p>
            </Navigate>
          </DrawerBody>
          {/* Add the content of the drawer here */}
        </DrawerContent>
      </Drawer>
    </chakra.header>
  )
}
