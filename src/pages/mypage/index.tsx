// src/pages/mypage/index.tsx
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'

export const Page = () => {
  const { user } = useAuthContext()

  if (!user) {
    return <Box>ログインしていません</Box>
  }

  return (
    <Box>
      <Heading>マイページ</Heading>
      <TableContainer className="p-20">
        <Table variant="simple">
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
    </Box>
  )
}

export default Page
