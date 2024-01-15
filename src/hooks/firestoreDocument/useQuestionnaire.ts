import { useState, useEffect } from 'react'
import type { Questionnaire } from '@src/types/questionnaire'
import { getFirestore, doc, getDoc } from '@firebase/firestore'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

export const useQuestionnaires = () => {
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
            orderBy('createdTime', 'desc')
          )
        )
        const questionnaires = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Questionnaire)
        )
        setQuestionnaires(questionnaires)
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestionnaires()
  }, [])

  return { questionnaires, loading, error }
}

export const useQuestionnaireById = (id?: string) => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      if (!id) return
      try {
        const db = getFirestore()
        const questionnaireDocRef = doc(db, 'questionnaires', id)
        const questionnaireDoc = await getDoc(questionnaireDocRef)
        if (!questionnaireDoc.exists) {
          setQuestionnaire(null)
        } else {
          const questionnaire = {
            id: questionnaireDoc.id,
            ...questionnaireDoc.data(),
          } as Questionnaire
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

export const useQuestionnairesByIds = (ids: string[]) => {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        const db = getFirestore()
        const fetchedQuestionnaires = await Promise.all(
          ids.map(async (id) => {
            const docRef = doc(db, 'questionnaires', id)
            const docSnap = await getDoc(docRef)
            return docSnap.exists()
              ? ({ id: docSnap.id, ...docSnap.data() } as Questionnaire)
              : null
          })
        )
        setQuestionnaires(
          fetchedQuestionnaires.filter((q) => q !== null) as Questionnaire[]
        )
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestionnaires()
  }, [ids])

  return { questionnaires, loading, error }
}

export const useQuestionnaireByUserId = (userId?: string) => {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      if (!userId) return
      try {
        const db = getFirestore()
        const querySnapshot = await getDocs(
          query(
            collection(db, 'questionnaires'),
            where('userId', '==', userId),
            orderBy('createdTime', 'desc')
          )
        )
        const questionnaires = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Questionnaire)
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
export const useOtherPeopleQuestionnairesByUserId = (userId: string) => {
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
            where('isAuthenticated', '==', true),
            orderBy('createdTime', 'desc')
          )
        )
        const questionnaires = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Questionnaire)
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
