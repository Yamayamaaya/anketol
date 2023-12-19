import type { NextPage } from 'next'
import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react'
import { TableItem } from '@src/components/TableItem'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { useUserById } from '@src/hooks/hooks/useUser'
import { useQuestionnaires } from '@src/hooks/hooks/useQuestionnaire'
import { useEffect, useState } from 'react'

const Page: NextPage = () => {
  const { user: authUser } = useAuthContext()
  const { user } = useUserById(authUser?.uid || '')
  const { questionnaires } = useQuestionnaires()
  const [otherPeopleQuestionnaires, setOtherPeopleQuestionnaires] =
    useState(questionnaires)
  useEffect(() => {
    setOtherPeopleQuestionnaires(
      questionnaires.filter(
        (questionnaire) => questionnaire.userId !== user?.id
      )
    )
  }, [questionnaires, user])

  return (
    <>
      <TableContainer className="p-8">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>タイトル</Th>
              <Th> </Th>
              <Th>投稿者</Th>
              <Th>回答</Th>
            </Tr>
          </Thead>
          <Tbody>
            {otherPeopleQuestionnaires.map((questionnaire, index) => (
              <TableItem
                questionnaire={questionnaire}
                index={index}
                key={index}
                user={user || undefined}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Page
