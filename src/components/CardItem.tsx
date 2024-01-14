import {
  Avatar,
  Badge,
  Button,
  Box as Card,
  Box as CardBody,
  Box as CardFooter,
  Box as CardHeader,
} from '@chakra-ui/react'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { useEffect } from 'react'
import type { Questionnaire } from '@src/types/questionnaire'
import type { User } from '@src/types/user'
import { useAnswerLogsByRespondentGmail } from '@src/hooks/firestoreDocument/useAnswerLog'

interface CardProps {
  questionnaire: Questionnaire
  index: number
  user?: User | undefined
}

export const CardItem = ({ questionnaire, user }: CardProps) => {
  const { user: questionnaireUser, loading } = useUserById(questionnaire.userId)

  const { answerLogs, loading: loadingAnswerLogs } =
    useAnswerLogsByRespondentGmail(user?.email || '')

  useEffect(() => {}, [loading, loadingAnswerLogs])

  const isAnswered = answerLogs.some(
    (answerLog) => answerLog.formId === questionnaire.id
  )

  return (
    <Card borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4}>
      <CardHeader
        p={2}
        bg="gray.100"
        borderRadius="md"
        display="flex"
        justifyContent="space-between"
      >
        <div className="flex items-center">
          <span className="ml-2 font-bold">{questionnaire.title}</span>
          {isAnswered ? (
            <Badge colorScheme="green" className="mx-4">
              回答済
            </Badge>
          ) : (
            <Badge colorScheme="red" className="mx-4">
              未回答
            </Badge>
          )}
        </div>
        <button
          // href={questionnaire.url}
          onClick={() => window.open(questionnaire.url, '_blank')}
          className="flex items-center bg-blue-500 text-white rounded-md px-2 py-1"
        >
          <span className="text-sm">回答する</span>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            size="xs"
            className="w-3 h-3 ml-1"
          />
        </button>
      </CardHeader>
      <CardBody display="flex" alignItems="center" p={2}>
        <a
          href={questionnaire.url}
          className="flex items-center"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </CardBody>
      <CardFooter
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        p={2}
      >
        <Avatar
          flexShrink={0}
          width={7}
          height={7}
          src={questionnaireUser?.photoURL || 'default_image_url'}
        />
        <span className="ml-4 text-sm">{questionnaireUser?.displayName}</span>
      </CardFooter>
    </Card>
  )
}
