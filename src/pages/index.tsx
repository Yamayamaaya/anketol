import type { NextPage } from 'next'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { useQuestionnaires } from '@src/hooks/firestoreDocument/useQuestionnaire'
import { useEffect, useState } from 'react'
import { CardItem } from '@src/components/CardItem'

const Page: NextPage = () => {
  const { user: authUser } = useAuthContext()
  const { user } = useUserById(authUser?.uid)
  const { questionnaires } = useQuestionnaires()
  const [otherPeopleQuestionnaires, setOtherPeopleQuestionnaires] =
    useState(questionnaires)
  useEffect(() => {
    setOtherPeopleQuestionnaires(
      questionnaires.filter((questionnaire) => {
        return questionnaire.userId !== user?.id && questionnaire.active
      })
    )
  }, [questionnaires, user])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold my-8">アンケート一覧</h1>
      <div className="md:w-3/5 flex flex-col items-center justify-center gap-4 max-w-[530px]">
        {otherPeopleQuestionnaires.map((questionnaire, index) => (
          <CardItem
            questionnaire={questionnaire}
            key={index}
            user={user || undefined}
          />
        ))}
      </div>
    </div>
  )
}

export default Page
