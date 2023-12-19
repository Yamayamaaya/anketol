import { useState, useEffect } from 'react'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from '@firebase/firestore'
import type { AnswerLog } from '@src/types/answerLog'

export const useAnswerLogsByRespondentGmail = (respondentGmail: string) => {
  const [answerLogs, setAnswerLogs] = useState<AnswerLog[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchAnswerLogs = async () => {
      try {
        const db = getFirestore()
        const querySnapshot = await getDocs(
          query(
            collection(db, 'answerLogs'),
            where('respondentGmail', '==', respondentGmail)
          )
        )
        const answerLogs = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as AnswerLog)
        )
        setAnswerLogs(answerLogs)
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnswerLogs()
  }, [respondentGmail])

  return { answerLogs, loading, error }
}
