import { useState, useEffect } from 'react'
import type { Questionnaire } from '@src/types/questionnaire'
import { getFirestore, doc, getDoc } from '@firebase/firestore'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

export const useQuestionnaireById = (id: string) => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const db = getFirestore()
        const questionnaireDocRef = doc(db, 'questionnaires', id)
        const questionnaireDoc = await getDoc(questionnaireDocRef)
        if (!questionnaireDoc.exists) {
          setQuestionnaire(null)
        } else {
          const questionnaire = questionnaireDoc.data() as Questionnaire
          setQuestionnaire(questionnaire)
        }
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestionnaire()
  }, [id])

  return { questionnaire, loading, error }
}

export const useQuestionnaireByUserId = (userId: string) => {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        const db = getFirestore()
        const querySnapshot = await getDocs(
          query(
            collection(db, 'questionnaires'),
            where('userId', '==', userId),
            orderBy('createdTime', 'desc')
          )
        )
        console.log('querySnapshot', querySnapshot)
        const questionnaires = querySnapshot.docs.map(
          (doc) => doc.data() as Questionnaire
        )
        setQuestionnaires(questionnaires)
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestionnaires()
  }, [userId])

  return { questionnaires, loading, error }
}
