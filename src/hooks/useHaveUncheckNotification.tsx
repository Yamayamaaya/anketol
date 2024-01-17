import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { useQuestionnairesByUserId } from './firestoreDocument/useQuestionnaire'
import {
  useAnswerLogsByRespondentGmail,
  useAnswerLogsByQuestionnaireIds,
} from '@src/hooks/firestoreDocument/useAnswerLog'
import type { User } from '@src/types/user'

export const useHaveUncheckNotification = (user: User) => {
  console.log('useHaveUncheckNotification')
  const { questionnaires } = useQuestionnairesByUserId(user?.id)
  const myQuestionnaireIds = questionnaires.map((q) => q.id)
  const { answerLogs: myAnswerLogs, loading: myAnswerLogsLoading } =
    useAnswerLogsByQuestionnaireIds(myQuestionnaireIds)
  const { answerLogs, loading: answerLogsLoading } =
    useAnswerLogsByRespondentGmail(user?.email || '')

  if (answerLogsLoading || myAnswerLogsLoading) {
    return false
  }

  console.log(
    'user?.lastNotificationCheckTime',
    user?.lastNotificationCheckTime?.toDate().toLocaleString()
  )
  const result = !(
    user?.lastNotificationCheckTime &&
    [...answerLogs, ...myAnswerLogs].some(
      (log) =>
        log.createdTime.toDate().getTime() <
        user.lastNotificationCheckTime?.toDate().getTime()!
    )
  )

  console.log('result', result)

  return result
}
