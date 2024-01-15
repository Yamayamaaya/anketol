import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { CardItem } from '@src/components/CardItem'
import CustomPage from '@src/components/CustomPage'
import { ProfileCard } from '@src/components/ProfileCard'
import { useAnswerLogsByRespondentGmail } from '@src/hooks/firestoreDocument/useAnswerLog'
import { getFirestore, doc, getDoc } from '@firebase/firestore'
import type { Questionnaire } from '@src/types/questionnaire'
import { useEffect, useState } from 'react'

const useQuestionnairesByIds = (ids: string[]) => {
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

export const AnsweredPage = () => {
  const { user: authUser } = useAuthContext()
  const { user, loading: userLoading } = useUserById(authUser?.uid)
  console.log(user)
  const { answerLogs, loading: questionnairesLoading } =
    useAnswerLogsByRespondentGmail(user?.email || '')

  const questionnaireIds = answerLogs.map((answerLog) => answerLog.formId)

  const { questionnaires, loading, error } =
    useQuestionnairesByIds(questionnaireIds)

  return (
    <CustomPage
      title="回答済みアンケート"
      isTitleHidden={true}
      isAuthPageHidden={!user}
      loading={userLoading || questionnairesLoading || loading}
    >
      <div className="w-screen flex ">
        <ProfileCard user={user || undefined} display="answered" />
        <div className="md:w-3/4 md:p-12 w-full">
          <h2 className="text-2xl font-bold mt-4 text-center">
            回答済みアンケート
          </h2>
          <div className="mx-[3%] flex flex-col items-center justify-center gap-2 m-4 w-[94%]">
            {questionnaires.map((questionnaire) => (
              <CardItem
                key={questionnaire.id}
                questionnaire={questionnaire}
                user={user || undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </CustomPage>
  )
}

export default AnsweredPage
