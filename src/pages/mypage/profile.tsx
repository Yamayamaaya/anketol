import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
  Divider,
} from '@chakra-ui/react'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import type { User } from '@src/types/user'
import { useState } from 'react'
import { useUserById } from '@src/hooks/firestoreDocument/useUser'

export const ProfilePage = () => {
  const { user: authUser } = useAuthContext()
  const { user } = useUserById(authUser?.uid)

  if (!user) {
    return <Box>ログインしていません</Box>
  }

  return (
    <TableContainer>
      <p className="text-2xl font-bold">プロフィール</p>
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
            <Td>{user.displayName}</Td>
          </Tr>
          <Tr>
            <Td>メールアドレス</Td>
            <Td>{user.email}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ProfilePage
