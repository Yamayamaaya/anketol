import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import CustomPage from '@src/components/CustomPage'
import { ProfileCard } from '@src/components/ProfileCard'

export const ProfilePage = () => {
  const { user: authUser } = useAuthContext()
  const { user, loading } = useUserById(authUser?.uid)
  const tableSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' })

  return (
    <CustomPage
      title="プロフィール"
      isTitleHidden={true}
      isAuthPageHidden={!user}
      loading={loading}
    >
      <div className="w-screen flex ">
        <ProfileCard user={user || undefined} display="profile" />
        <div className="md:w-3/4 md:p-12">
          <h2 className="text-2xl font-bold mt-4 text-center">プロフィール</h2>
          <TableContainer className="mt-8 w-[90vw] mx-[5vw]">
            <Table variant="simple" size={tableSize}>
              <Thead>
                <Tr>
                  <Th>項目</Th>
                  <Th>登録情報</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>ユーザー名</Td>
                  <Td>{user?.displayName}</Td>
                </Tr>
                <Tr>
                  <Td>メールアドレス</Td>
                  <Td>{user?.email}</Td>
                </Tr>
                <Tr>
                  <Td>回答数</Td>
                  <Td>{user?.answerCount || 0}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </CustomPage>
  )
}

export default ProfilePage
