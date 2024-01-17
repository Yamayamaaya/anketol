import { useUserByEmail } from '@src/hooks/firestoreDocument/useUser'
import type { AnswerLog } from '@src/types/answerLog'
import { useQuestionnaireById } from '@src/hooks/firestoreDocument/useQuestionnaire'
import { formatTimestamp } from '@src/feature/formatTimestamp'

type notificationProps = {
  log: AnswerLog
}

export const NotificationItem = ({ log }: notificationProps) => {
  const { user: respondent } = useUserByEmail(log.respondentGmail)
  const { questionnaire } = useQuestionnaireById(log.formId)

  return (
    <div className="w-full">
      <p className="text-sm md:text-base text-start ml-12 text-black my-2">
        <span className="text-xs md:text-sm text-gray-500 pr-6">
          {formatTimestamp(log.createdTime)}
        </span>
        {respondent?.displayName}
        さんが{questionnaire?.title}に回答しました。
      </p>
    </div>
  )
}
