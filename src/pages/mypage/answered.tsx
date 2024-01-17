import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { CardItem } from '@src/components/CardItem'
import CustomPage from '@src/components/CustomPage'
import { ProfileCard } from '@src/components/ProfileCard'
import { useAnswerLogsByRespondentGmail } from '@src/hooks/firestoreDocument/useAnswerLog'
import { useQuestionnairesByIds } from '@src/hooks/firestoreDocument/useQuestionnaire'

export const AnsweredPage = () => {
  const { user: authUser } = useAuthContext()
  const { user, loading: userLoading } = useUserById(authUser?.uid)
  const { answerLogs, loading: questionnairesLoading } =
    useAnswerLogsByRespondentGmail(user?.email || '')

  const questionnaireIds = answerLogs.map((answerLog) => answerLog.formId)

  const { questionnaires, loading } = useQuestionnairesByIds(questionnaireIds)

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
          <h2 className="text-xl md:text-2xl font-bold mt-4 text-center">
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
