import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'

import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { useQuestionnaireByUserId } from '@src/hooks/firestoreDocument/useQuestionnaire'
import { CardItem } from '@src/components/CardItem'

export const PostedPage = () => {
  const { user: authUser } = useAuthContext()
  const { user } = useUserById(authUser?.uid)
  const { questionnaires } = useQuestionnaireByUserId(user?.id)

  if (!user) {
    return <h1>ログインしていません</h1>
  }

  return (
    <div className="mx-auto">
      <p className="text-2xl font-bold">投稿済みアンケート</p>
      <div className="mx-[10vw] flex flex-col items-center justify-center gap-2 m-4 max-w-[80vw]">
        {questionnaires.map((questionnaire) => (
          <CardItem
            key={questionnaire.id}
            questionnaire={questionnaire}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default PostedPage
