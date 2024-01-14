import { Box, Avatar, Divider } from '@chakra-ui/react'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import type { User } from '@src/types/user'
import { useState } from 'react'
import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { useQuestionnaireByUserId } from '@src/hooks/firestoreDocument/useQuestionnaire'
import type { Questionnaire } from '@src/types/questionnaire'
import { CardItem } from '@src/components/CardItem'

export const PostedPage = () => {
  const { user: authUser } = useAuthContext()
  const { user } = useUserById(authUser?.uid)
  const { questionnaires } = useQuestionnaireByUserId(user?.id)

  if (!user) {
    return <Box>ログインしていません</Box>
  }

  return (
    <div className="mx-auto">
      <p className="text-2xl font-bold">投稿済みアンケート</p>
      <div className="flex flex-col items-center justify-center gap-2 m-4">
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
