import { Avatar, Td, Tr } from '@chakra-ui/react'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUserById } from '@src/hooks/hooks/useUser'
import { useEffect } from 'react'
import type { Questionnaire } from '@src/types/questionnaire'

interface TableItemProps {
  questionnaire: Questionnaire
  index: number
}

export const TableItem = ({ questionnaire, index }: TableItemProps) => {
  const { user, loading } = useUserById(questionnaire.userId)
  useEffect(() => {}, [loading])

  // Handle loading and error states appropriately here

  console.log(questionnaire)

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
          src={user?.photoURL || 'default_image_url'}
        />
        <span className="ml-2 text-sm">{user?.displayName}</span>
      </Td>
      <Td>{questionnaire.expiry?.toDate().toLocaleDateString()}</Td>
    </Tr>
  )
}
