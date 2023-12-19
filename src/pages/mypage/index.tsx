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
import { useUserById } from '@src/hooks/hooks/useUser'
import { useQuestionnaireByUserId } from '@src/hooks/hooks/useQuestionnaire'
import type { Questionnaire } from '@src/types/questionnaire'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFile,
  faPenToSquare,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { getFirestore, doc, deleteDoc } from 'firebase/firestore'
import { activateQuestionnaire } from '@src/feature/questionnaire/activateQuestionneaire'

export const Page = () => {
  const { user: authUser } = useAuthContext()
  const { user, loading: loadingUser } = useUserById(authUser?.uid)
  const { questionnaires, loading: loadingQuestionnaire } =
    useQuestionnaireByUserId(user?.id)
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
      <div className="w-3/4 h-screen">
        {selectedTab === 'profile' && ProfileTab(user)}
        {selectedTab === 'posted' && PostedTab(questionnaires, toast, router)}
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

const PostedTab = (
  questionnaires: Questionnaire[],
  toast: any,
  router: any
) => {
  const handleDeleteQuestionnaire = async (questionnaireId: string) => {
    const db = getFirestore()
    const docRef = doc(db, 'questionnaires', questionnaireId)
    await deleteDoc(docRef)
    toast({
      title: '削除しました。',
      status: 'success',
      position: 'top',
    })
    router.reload()
  }

  const handleEditQuestionnaire = async (questionnaireId: string) => {
    router.push(`/questionnaire/edit/${questionnaireId}`)
  }

  const onChangeActive = async (questionnaireId: string) => {
    await activateQuestionnaire(questionnaireId)
    toast({
      title: '更新しました。',
      status: 'success',
      position: 'top',
    })
    setTimeout(() => {
      router.reload()
    }, 200)
  }
  // リロードはせず、再レンダリングする

  return (
    <TableContainer className="px-4 pt-12">
      <p className="text-2xl font-bold fixed">投稿済みアンケート</p>
      <Table variant="simple" className="mt-16 w-full overflow-x-auto">
        <Thead>
          <Tr>
            <Th> </Th>
            <Th>有効</Th>
            <Th>タイトル</Th>
            <Th>認証</Th>
            <Th>有効期限</Th>
            <Th>URL</Th>
          </Tr>
        </Thead>
        <Tbody>
          {questionnaires.map((questionnaire, index) => (
            <Tr key={index}>
              <Td>
                <button
                  onClick={() => handleEditQuestionnaire(questionnaire.id)}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="xs"
                    className="h-3 w-3 mr-2"
                  />
                </button>
                <button
                  onClick={() => handleDeleteQuestionnaire(questionnaire.id)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="xs"
                    className="h-3 w-3 ml-2"
                  />
                </button>
              </Td>
              <Td>
                <Radio
                  size="md"
                  name="1"
                  colorScheme="green"
                  defaultChecked={questionnaire.active}
                  onChange={() => onChangeActive(questionnaire.id)}
                ></Radio>
              </Td>
              <Td>{questionnaire.title}</Td>
              <Td>
                {questionnaire.isAuthenticated ? (
                  <Badge colorScheme="green">認証済</Badge>
                ) : (
                  <Badge colorScheme="red">未認証</Badge>
                )}
              </Td>

              <Td>{questionnaire.expiry?.toDate().toLocaleDateString()}</Td>
              <Td className="text-xs">{questionnaire.url}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
