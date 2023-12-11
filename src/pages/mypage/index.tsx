// src/pages/mypage/index.tsx
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
import { useEffect, useState } from 'react'
import { useUserById } from '@src/hooks/hooks/useUser'
import { useQuestionnaireByUserId } from '@src/hooks/hooks/useQuestionnaire'
import type { Questionnaire } from '@src/types/questionnaire'

export const Page = () => {
  const { user: authUser } = useAuthContext()
  const { user, loading: loadingUser } = useUserById(authUser?.uid || '')
  const { questionnaires, loading: loadingQuestionnaire } =
    useQuestionnaireByUserId(authUser?.uid || '')
  const [selectedTab, setSelectedTab] = useState('profile')

  useEffect(() => {}, [loadingUser, loadingQuestionnaire])

  if (!user) {
    return <Box>ログインしていません</Box>
  }

  return (
    <div className="w-screen flex  overflow-x-hidden">
      <div className="w-1/4 flex justify-center">
        <div className="w-3/5 flex h-max flex-col items-center justify-center shadow-lg gap-2 mt-12 rounded-md">
          <Avatar
            flexShrink={0}
            width={10}
            height={10}
            src={user.photoURL || 'default_image_url'}
          />
          <p>{user.displayName}</p>
          <Divider />
          <div className="flex flex-col items-start justify-center gap-2 my-4">
            <button
              onClick={() => setSelectedTab('profile')}
              className={`${
                selectedTab === 'profile' ? 'text-black' : 'text-gray-500'
              }`}
            >
              プロフィール
            </button>
            <button
              onClick={() => setSelectedTab('posted')}
              className={`${
                selectedTab === 'posted' ? 'text-black' : 'text-gray-500'
              }`}
            >
              投稿済みアンケート
            </button>
            {/* TODO:以下 */}
            {/* <button
              onClick={() => setSelectedTab('answered')}
              className={`${
                selectedTab === 'answered' ? 'text-black' : 'text-gray-500'
              }`}
            >
              回答済みアンケート
            </button>
            <button
              onClick={() => setSelectedTab('signout')}
              className={`${
                selectedTab === 'signout' ? 'text-black' : 'text-gray-500'
              }`}
            >
              サインアウト
            </button> */}
          </div>
        </div>
      </div>
      <div className="w-3/4 h-screen">
        {selectedTab === 'profile' && ProfileTab(user)}
        {selectedTab === 'posted' && PostedTab(questionnaires)}
        {/* {selectedTab === 'answered' && <div>回答済みアンケート</div>}
        {selectedTab === 'signout' && <div>サインアウト</div>} */}
      </div>
    </div>
  )
}

export default Page

const ProfileTab = (user: User) => {
  return (
    <TableContainer className="p-12">
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

const PostedTab = (questionnaires: Questionnaire[]) => {
  return (
    <TableContainer className="p-12 ">
      <p className="text-2xl font-bold fixed">投稿済みアンケート</p>
      <Table variant="simple" className="mt-16 w-full overflow-x-auto">
        <Thead>
          <Tr>
            <Th>タイトル</Th>
            <Th>有効期限</Th>
            <Th>URL</Th>
          </Tr>
        </Thead>
        <Tbody>
          {questionnaires.map((questionnaire, index) => (
            <Tr key={index}>
              <Td>{questionnaire.title}</Td>
              <Td>{questionnaire.expiry?.toDate().toLocaleDateString()}</Td>
              <Td className="text-xs">{questionnaire.url}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
