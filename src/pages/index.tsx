import type { NextPage } from 'next'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { getFirestore, collection, getDocs } from '@firebase/firestore'
import { useState, useEffect } from 'react'

const Page: NextPage = () => {
  const [questionnaires, setQuestionnaires] = useState<any[]>([])

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      const db = getFirestore()
      const questionnaireCollection = collection(db, 'questionnaire')
      const questionnaireSnapshot = await getDocs(questionnaireCollection)
      const questionnaireData = questionnaireSnapshot.docs.map((doc) =>
        doc.data()
      )
      setQuestionnaires(questionnaireData)
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
              <Th>URL</Th>
              <Th>有効期限</Th>
            </Tr>
          </Thead>
          <Tbody>
            {questionnaires.map((questionnaire, index) => (
              <Tr key={index}>
                <Td>{questionnaire.title}</Td>
                <Td>{questionnaire.url}</Td>
                <Td>{questionnaire.expiry.toDate().toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Page
