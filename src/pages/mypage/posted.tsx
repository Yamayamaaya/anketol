import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'

import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { useQuestionnaireByUserId } from '@src/hooks/firestoreDocument/useQuestionnaire'
import { CardItem } from '@src/components/CardItem'
import CustomPage from '@src/components/CustomPage'
import { ProfileCard } from '@src/components/ProfileCard'

export const PostedPage = () => {
  const { user: authUser } = useAuthContext()
  const { user, loading: userLoading } = useUserById(authUser?.uid)
  const { questionnaires, loading: questionnairesLoading } =
    useQuestionnaireByUserId(user?.id)

  return (
    <CustomPage
      title="投稿済みアンケート"
      isTitleHidden={true}
      isAuthPageHidden={!user}
      loading={userLoading || questionnairesLoading}
    >
      <div className="w-screen flex ">
        <ProfileCard user={user || undefined} display="posted" />
        <div className="md:w-3/4 md:p-12 w-full">
          <h2 className="text-xl md:text-2xl font-bold mt-4 text-center">
            投稿済みアンケート
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

export default PostedPage
