import { Avatar, Badge, Td, Tr } from '@chakra-ui/react'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUserById } from '@src/hooks/hooks/useUser'
import { useEffect } from 'react'
import type { Questionnaire } from '@src/types/questionnaire'
import type { User } from '@src/types/user'
import { useAnswerLogsByRespondentGmail } from '@src/hooks/hooks/useAnswerLog'

interface TableItemProps {
  questionnaire: Questionnaire
  index: number
  user?: User | undefined
}

export const TableItem = ({ questionnaire, index, user }: TableItemProps) => {
  const { user: questionnaireUser, loading } = useUserById(questionnaire.userId)

  const { answerLogs, loading: loadingAnswerLogs } =
    useAnswerLogsByRespondentGmail(user?.email || '')

  useEffect(() => {}, [loading, loadingAnswerLogs])
  // Handle loading and error states appropriately here

  console.log(answerLogs)
  console.log(questionnaire.id)

  const isAnswered = answerLogs.some(
    (answerLog) => answerLog.formId === questionnaire.id
  )

  return (
    <Tr key={index}>
      <Td>{questionnaire.title}</Td>
      <Td>
        <a href={questionnaire.url} className="flex items-center">
          <span>回答する</span>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            size="xs"
            className="w-3 h-3 ml-1"
          />
        </a>
      </Td>
      <Td className="flex items-center">
        <Avatar
          flexShrink={0}
          width={6}
          height={6}
          src={questionnaireUser?.photoURL || 'default_image_url'}
        />
        <span className="ml-2 text-sm">{questionnaireUser?.displayName}</span>
      </Td>
      <Td>
        {isAnswered ? (
          <Badge colorScheme="green">回答済</Badge>
        ) : (
          <Badge>未回答</Badge>
        )}
      </Td>
    </Tr>
  )
}
