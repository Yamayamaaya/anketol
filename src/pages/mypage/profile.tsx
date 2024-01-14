import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import CustomPage from '@src/components/CustomPage'

export const ProfilePage = () => {
  const { user: authUser } = useAuthContext()
  const { user, loading } = useUserById(authUser?.uid)

  return (
    <CustomPage title="プロフィール" isAuthPageHidden={!user} loading={loading}>
      <TableContainer>
        <Table variant="simple" className="mt-8">
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
          </Tbody>
        </Table>
      </TableContainer>
    </CustomPage>
  )
}

export default ProfilePage
