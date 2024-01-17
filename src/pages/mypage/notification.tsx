import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import {
  useAnswerLogsByRespondentGmail,
  useAnswerLogsByQuestionnaireIds,
} from '@src/hooks/firestoreDocument/useAnswerLog'
import { useQuestionnairesByUserId } from '@src/hooks/firestoreDocument/useQuestionnaire'
import CustomPage from '@src/components/CustomPage'
import { NotificationItem } from '@src/components/NotificationItem'
import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { ProfileCard } from '@src/components/ProfileCard'
import { Divider } from '@chakra-ui/react'
import { doc, updateDoc, getFirestore } from 'firebase/firestore'
import { useEffect } from 'react'

export const NotificationPage = () => {
  const { user: authUser } = useAuthContext()
  const { user, loading: userLoading } = useUserById(authUser?.uid)
  const { answerLogs, loading: answerLogsLoading } =
    useAnswerLogsByRespondentGmail(user?.email || '')
  const { questionnaires } = useQuestionnairesByUserId(user?.id)

  // 自分のアンケートIDのリストを取得
  const myQuestionnaireIds = questionnaires.map((q) => q.id)

  // 自分のアンケートに対する回答ログを取得
  const { answerLogs: myAnswerLogs } =
    useAnswerLogsByQuestionnaireIds(myQuestionnaireIds)

  // アンサーログをまとめて、新しい順に並び替える
  const answerLogsAll = [...answerLogs, ...myAnswerLogs].sort(
    (a, b) =>
      b.createdTime.toDate().getTime() - a.createdTime.toDate().getTime()
  )

  const updateLastNotificationCheckTime = async () => {
    if (user?.id) {
      const db = getFirestore()
      const userRef = doc(db, 'users', user.id)
      await updateDoc(userRef, {
        lastNotificationCheckTime: new Date(),
      })
    }
  }

  useEffect(() => {
    updateLastNotificationCheckTime()
  }, [user])

  return (
    <CustomPage
      title="あなたへのお知らせ"
      isTitleHidden={true}
      loading={userLoading || answerLogsLoading}
    >
      <div className="w-screen flex ">
        <ProfileCard user={user || undefined} display="notification" />
        <div className="md:w-3/4 md:p-12 w-full">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-xl md:text-2xl font-bold mt-4">
              あなたへのお知らせ
            </h1>
            <div className="w-full mt-4">
              {answerLogsAll.map((log) => (
                <>
                  <NotificationItem
                    key={log.id}
                    log={log}
                    owner={log.respondentGmail === user?.email}
                    bagde={
                      !(
                        user?.lastNotificationCheckTime &&
                        log.createdTime.toDate().getTime() <
                          user?.lastNotificationCheckTime?.toDate().getTime()
                      )
                    }
                  />
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
