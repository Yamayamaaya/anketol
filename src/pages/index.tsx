import type { NextPage } from 'next'
import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react'
import { getFirestore, collection, getDocs } from '@firebase/firestore'
import { useState, useEffect } from 'react'
import { TableItem } from '@src/component/TableItem'

const Page: NextPage = () => {
  const [questionnaires, setQuestionnaires] = useState<any[]>([])

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      const db = getFirestore()
      const questionnairesCollection = collection(db, 'questionnaires')
      const questionnairesSnapshot = await getDocs(questionnairesCollection)
      const questionnairesData = questionnairesSnapshot.docs.map((doc) =>
        doc.data()
      )
      setQuestionnaires(questionnairesData)
    }

    fetchQuestionnaires()
  }, [])

  return (
    <>
      <TableContainer className="p-8">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>タイトル</Th>
              <Th> </Th>
              <Th>投稿者</Th>
              <Th>有効期限</Th>
            </Tr>
          </Thead>
          <Tbody>
            {questionnaires.map((questionnaire, index) => (
              <TableItem
                questionnaire={questionnaire}
                index={index}
                key={index}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Page
