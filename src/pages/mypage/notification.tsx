import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import {
  useAnswerLogsByRespondentGmail,
  useAnswerLogsByQuestionnaireIds,
} from '@src/hooks/firestoreDocument/useAnswerLog'
import { useQuestionnaireByUserId } from '@src/hooks/firestoreDocument/useQuestionnaire'
import CustomPage from '@src/components/CustomPage'
import { NotificationItem } from '@src/components/NotificationItem'
import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { ProfileCard } from '@src/components/ProfileCard'
import { Divider } from '@chakra-ui/react'

export const NotificationPage = () => {
  const { user: authUser } = useAuthContext()
  const { user, loading: userLoading } = useUserById(authUser?.uid)
  const { answerLogs, loading: answerLogsLoading } =
    useAnswerLogsByRespondentGmail(user?.email || '')
  const { questionnaires } = useQuestionnaireByUserId(user?.id)

  // 自分のアンケートIDのリストを取得
  const myQuestionnaireIds = questionnaires.map((q) => q.id)

  // 自分のアンケートに対する回答ログを取得
  const { answerLogs: myAnswerLogs } =
    useAnswerLogsByQuestionnaireIds(myQuestionnaireIds)

  return (
    <CustomPage
      title="あなたへのお知らせ"
      isTitleHidden={true}
      loading={userLoading || answerLogsLoading}
    >
      <div className="w-screen flex ">
        <ProfileCard user={user || undefined} display="answered" />
        <div className="md:w-3/4 md:p-12 w-full">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-2xl font-bold">あなたへのお知らせ</h1>
            <div className="w-full mt-4">
              {answerLogs.map((log) => (
                <>
                  <NotificationItem key={log.id} log={log} />
                  <Divider />
                </>
              ))}
              {myAnswerLogs.map((log) => (
                <>
                  <NotificationItem key={log.id} log={log} />
                  <Divider />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CustomPage>
  )
}

export default NotificationPage
