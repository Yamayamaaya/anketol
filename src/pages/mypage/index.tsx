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
  useToast,
  Badge,
  Radio,
} from '@chakra-ui/react'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import type { User } from '@src/types/user'
import { useState } from 'react'
import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { useQuestionnaireByUserId } from '@src/hooks/firestoreDocument/useQuestionnaire'
import type { Questionnaire } from '@src/types/questionnaire'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUpRightFromSquare,
  faFile,
  faPenToSquare,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { getFirestore, doc, deleteDoc } from 'firebase/firestore'
import { activateQuestionnaire } from '@src/feature/questionnaire/activateQuestionneaire'
import { requestForGAS } from '@src/feature/GAS/requestForGAS'
import { CardItem } from '@src/components/CardItem'

export const Page = () => {
  const { user: authUser } = useAuthContext()
  const { user } = useUserById(authUser?.uid)
  const { questionnaires } = useQuestionnaireByUserId(user?.id)
  const [selectedTab, setSelectedTab] = useState('profile')
  const toast = useToast()
  const router = useRouter()

  if (!user) {
    return <Box>ログインしていません</Box>
  }

  return (
    <div className="w-screen flex  overflow-x-hidden">
      <div className="w-1/4 flex justify-center">
        <div className="w-4/5 flex min-w-[180px] h-max flex-col items-center justify-center shadow-lg gap-2 mt-12 rounded-md">
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
              className={` ${
                selectedTab === 'profile' ? 'text-black' : 'text-gray-500'
              } flex items-center gap-1.5
              `}
            >
              <FontAwesomeIcon icon={faUser} size="xs" className="h-3 w-3" />
              <span>プロフィール</span>
            </button>
            <button
              onClick={() => setSelectedTab('posted')}
              className={` ${
                selectedTab === 'posted' ? 'text-black' : 'text-gray-500'
              } flex items-center gap-1.5
              `}
            >
              <FontAwesomeIcon icon={faFile} size="xs" className="h-3 w-3" />
              <span>投稿済みアンケート</span>
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
      <div className="w-3/4 h-screen p-12">
        {selectedTab === 'profile' && ProfileTab(user)}
        {selectedTab === 'posted' && PostedTab(questionnaires, user)}
        {/* {selectedTab === 'answered' && <div>回答済みアンケート</div>}
        {selectedTab === 'signout' && <div>サインアウト</div>} */}
      </div>
    </div>
  )
}

export default Page

const ProfileTab = (user: User) => {
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

const PostedTab = (questionnaires: Questionnaire[], user: User) => {
  return (
    <div className="mx-auto">
      <p className="text-2xl font-bold">投稿済みアンケート</p>
      <div className="flex flex-col items-center justify-center gap-2 m-4">
        {questionnaires.map((questionnaire) => (
          <CardItem
            key={questionnaire.id}
            questionnaire={questionnaire}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}
