import { useUserByEmail } from '@src/hooks/firestoreDocument/useUser'
import type { AnswerLog } from '@src/types/answerLog'
import { useQuestionnaireById } from '@src/hooks/firestoreDocument/useQuestionnaire'
import { formatTimestamp } from '@src/feature/formatTimestamp'

type notificationProps = {
  log: AnswerLog
  owner?: boolean
  bagde?: boolean
}

export const NotificationItem = ({ log, owner, bagde }: notificationProps) => {
  const { user: respondent } = useUserByEmail(log.respondentGmail)
  const { questionnaire } = useQuestionnaireById(log.formId)

  return (
    <div className=" flex items-center ml-12  py-2 gap-4">
      {bagde && (
        <div className="text-xs md:text-sm text-gray-500 w-[0.5rem] h-[0.5rem] bg-[#38a169] rounded-full"></div>
      )}
      <span className="text-xs md:text-sm text-gray-500 ml-2 ">
        {formatTimestamp(log.createdTime)}
      </span>
      {owner ? (
        <p className="text-sm md:text-base text-start text-black">
          「{questionnaire?.title}」への回答が確認されました。
        </p>
      ) : (
        <p className="text-sm md:text-base text-start text-black">
          {respondent?.displayName}
          さんが「{questionnaire?.title}」に回答しました。
        </p>
      )}
    </div>
  )
}
