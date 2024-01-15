import {
  Avatar,
  chakra,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuGroup,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Divider,
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
        title: 'サインアウトしました。',
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
        isSignInOrUpPage ? 'md:w-[40%]' : ''
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
                className="w-36 md:w-[200px]"
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
              <MenuGroup title="マイページ">
                <MenuItem
                  onClick={() => push((path) => path.mypage.profile.$url())}
                  className="text-sm"
                >
                  プロフィール
                </MenuItem>
                <MenuItem
                  onClick={() => push((path) => path.mypage.posted.$url())}
                  className="text-sm"
                >
                  投稿済みアンケート
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="アカウント">
                <MenuItem
                  onClick={handleSignOut}
                  className="text-sm"
                  cursor={'pointer'}
                >
                  サインアウト
                </MenuItem>
              </MenuGroup>
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
              <MenuItem onClick={() => push((path) => path.signin.$url())}>
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
            <div onClick={handleToggle}>
              <Navigate href={(path) => path.$url()}>
                <p className="text-gray-700 hover:text-black hover:font-semibold">
                  トップページ
                </p>
              </Navigate>
            </div>
            <div onClick={handleToggle}>
              <Navigate href={(path) => path.questionnaire.$url()}>
                <p className="text-gray-700 hover:text-black hover:font-semibold">
                  アンケート投稿
                </p>
              </Navigate>
            </div>
            <Divider />
            <p className="text-gray-700">マイページ</p>
            <div onClick={handleToggle}>
              <Navigate href={(path) => path.mypage.profile.$url()}>
                <p className="text-gray-700 hover:text-black text-base hover:font-semibold -mt-2 ml-3">
                  プロフィール
                </p>
              </Navigate>
            </div>
            <div onClick={handleToggle}>
              <Navigate href={(path) => path.mypage.posted.$url()}>
                <p className="text-gray-700 hover:text-black text-base hover:font-semibold -mt-2 ml-3">
                  投稿済みアンケート
                </p>
              </Navigate>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </chakra.header>
  )
}
