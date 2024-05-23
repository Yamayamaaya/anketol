import {
  Avatar,
  Badge,
  Box as Card,
  Box as CardBody,
  Box as CardFooter,
  Box as CardHeader,
  Radio,
} from '@chakra-ui/react'
import {
  faArrowUpRightFromSquare,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { useEffect } from 'react'
import type { Questionnaire } from '@src/types/questionnaire'
import type { User } from '@src/types/user'
import { useAnswerLogsByRespondentGmail } from '@src/hooks/firestoreDocument/useAnswerLog'
import { getFirestore, doc, deleteDoc } from 'firebase/firestore'
import {
  useToast,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { activateQuestionnaire } from '@src/feature/questionnaire/activateQuestionneaire'
import { requestForGAS } from '@src/feature/GAS/requestForGAS'
import { omitTimestamp } from '@src/feature/omitTimestamp'
import { useDeleteDataOnFirestore } from '@src/hooks/firebase/useDeleteDataOnFirestore'

interface CardProps {
  questionnaire: Questionnaire
  user?: User
}

export const CardItem = ({ questionnaire, user }: CardProps) => {
  const { user: questionnaireUser, loading } = useUserById(questionnaire.userId)

  const { answerLogs, loading: loadingAnswerLogs } =
    useAnswerLogsByRespondentGmail(user?.email || '')

  useEffect(() => {}, [loading, loadingAnswerLogs])

  const isAnswered =
    answerLogs.some((answerLog) => answerLog.formId === questionnaire.id) &&
    answerLogs.length > 0

  const toast = useToast()
  const router = useRouter()
  const deleteData = useDeleteDataOnFirestore()

  const isOwnQuestionnaire = questionnaire.userId === user?.id

  const handleDeleteQuestionnaire = async (questionnaireId: string) => {
    await deleteData('questionnaires', questionnaireId)
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

  return (
    <Card
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      mb={4}
      w="100%"
    >
      <CardHeader
        p={2}
        bg="gray.100"
        borderRadius="md"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <div className="flex items-center">
          <span className="ml-2 font-bold text-sm md:text-base">
            {questionnaire.title}
          </span>
          {isOwnQuestionnaire ? (
            questionnaire.isAuthenticated ? (
              <Badge
                colorScheme="green"
                className="ml-1 mr-6text-xs md:text-sm"
              >
                認証済
              </Badge>
            ) : (
              <Badge
                colorScheme="red"
                className="ml-1 mr-6 ttext-xs md:text-sm"
              >
                未認証
              </Badge>
            )
          ) : isAnswered ? (
            <Badge
              colorScheme="green"
              className="ml-1 mr-6 ttext-xs md:text-sm"
            >
              回答済
            </Badge>
          ) : (
            <Badge colorScheme="red" className="ml-1 mr-6 text-xs md:text-sm">
              未回答
            </Badge>
          )}
        </div>
        {isOwnQuestionnaire ? (
          <div className="flex items-center">
            {questionnaire.isAuthenticated ? (
              <></>
            ) : (
              <button
                onClick={() => requestForGAS(questionnaire.id)}
                className="flex items-center bg-blue-500 text-white rounded-md px-2 py-1 mr-2 font-semibold  text-xs md:text-sm"
              >
                <span>認証する</span>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  size="xs"
                  className="w-2.5 ml-1"
                />
              </button>
            )}
            <button onClick={() => handleEditQuestionnaire(questionnaire.id)}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="xs"
                className="h-3 w-3 mx-2"
              />
            </button>
            <button
              onClick={() => {
                if (confirm('削除しますか？')) {
                  handleDeleteQuestionnaire(questionnaire.id)
                }
              }}
            >
              <FontAwesomeIcon
                icon={faTrash}
                size="xs"
                className="h-3 w-3 ml-2"
              />
            </button>
          </div>
        ) : isAnswered ? (
          <p className="text-xs md:text-sm">
            回答日時：{omitTimestamp(answerLogs[0]?.createdTime!)}
          </p>
        ) : (
          <button
            onClick={() => window.open(questionnaire.url, '_blank')}
            className="flex items-center bg-blue-500 text-white rounded-md px-2 py-1  text-xs md:text-sm font-semibold"
          >
            <span>回答する</span>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              size="xs"
              className="w-3 h-3 ml-1"
            />
          </button>
        )}
      </CardHeader>
      <CardBody display="flex" alignItems="center" p={2}>
        {isOwnQuestionnaire && (
          <TableContainer>
            <Table size="sm" overflowX="hidden">
              <Thead>
                <Tr></Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td className="font-semibold">URL</Td>
                  <Td>{questionnaire.url}</Td>
                </Tr>
                <Tr>
                  <Td className="font-semibold">有効期間</Td>
                  <Td>{questionnaire.expiry?.toDate().toLocaleString()}</Td>
                </Tr>
                <Tr>
                  <Td className="font-semibold">作成日</Td>
                  <Td>
                    {questionnaire.createdTime.toDate().toLocaleString()}
                    {questionnaire.createdTime.toDate().toLocaleString() !==
                      questionnaire.updatedTime.toDate().toLocaleString() && (
                      <p className="text-xs text-gray-800 mt-0.5">
                        (更新日:
                        {questionnaire.updatedTime.toDate().toLocaleString()})
                      </p>
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <Td className="font-semibold">有効</Td>
                  <Td>
                    <Radio
                      size="md"
                      name="1"
                      colorScheme="blue"
                      defaultChecked={questionnaire.active}
                      onChange={() => onChangeActive(questionnaire.id)}
                    ></Radio>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </CardBody>

      {!isOwnQuestionnaire && (
        <CardFooter
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          className="h-5 md:h-6"
        >
          <Avatar
            height="100%"
            width="auto"
            src={questionnaireUser?.photoURL || 'default_image_url'}
          />
          <span className="ml-2 text-xs md:text-sm mr-2">
            {questionnaireUser?.displayName}
          </span>
        </CardFooter>
      )}
    </Card>
  )
}
