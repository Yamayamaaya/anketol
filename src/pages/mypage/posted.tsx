import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'

import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { useQuestionnaireByUserId } from '@src/hooks/firestoreDocument/useQuestionnaire'
import { CardItem } from '@src/components/CardItem'
import CustomPage from '@src/components/CustomPage'

export const PostedPage = () => {
  const { user: authUser } = useAuthContext()
  const { user, loading: userLoading } = useUserById(authUser?.uid)
  const { questionnaires, loading: questionnairesLoading } =
    useQuestionnaireByUserId(user?.id)

  if (!user) {
    return <h1>ログインしていません</h1>
  }

  return (
    <CustomPage
      title="投稿済みアンケート"
      isAuthPageHidden={!user}
      loading={userLoading || questionnairesLoading}
    >
      <div className="mx-[10vw] flex flex-col items-center justify-center gap-2 m-4 max-w-[80vw]">
        {questionnaires.map((questionnaire) => (
          <CardItem
            key={questionnaire.id}
            questionnaire={questionnaire}
            user={user}
          />
        ))}
      </div>
    </CustomPage>
  )
}

export default PostedPage
