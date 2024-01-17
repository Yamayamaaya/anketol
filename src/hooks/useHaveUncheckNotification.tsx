import { useQuestionnairesByUserId } from './firestoreDocument/useQuestionnaire'
import {
  useAnswerLogsByRespondentGmail,
  useAnswerLogsByQuestionnaireIds,
} from '@src/hooks/firestoreDocument/useAnswerLog'
import type { User } from '@src/types/user'

export const useHaveUncheckNotification = (user: User) => {
  const { questionnaires } = useQuestionnairesByUserId(user?.id)
  const myQuestionnaireIds = questionnaires.map((q) => q.id)
  const { answerLogs: myAnswerLogs, loading: myAnswerLogsLoading } =
    useAnswerLogsByQuestionnaireIds(myQuestionnaireIds)
  const { answerLogs, loading: answerLogsLoading } =
    useAnswerLogsByRespondentGmail(user?.email || '')

  if (answerLogsLoading || myAnswerLogsLoading) {
    return false
  }

  console.log([...answerLogs, ...myAnswerLogs].length)

  const result = !(
    user?.lastNotificationCheckTime &&
    ([...answerLogs, ...myAnswerLogs].length == 0 ||
      [...answerLogs, ...myAnswerLogs].some(
        (log) =>
          log.createdTime.toDate().getTime() <
          user.lastNotificationCheckTime?.toDate().getTime()!
      ))
  )

  return result
}
