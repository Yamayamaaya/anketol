import type { NextPage } from 'next'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { useQuestionnaires } from '@src/hooks/firestoreDocument/useQuestionnaire'
import { useEffect, useState } from 'react'
import { CardItem } from '@src/components/CardItem'

const Page: NextPage = () => {
  const { user: authUser } = useAuthContext()
  const { user } = useUserById(authUser?.uid || '')
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
    <div className="w-3/5 my-8 max-w-[530px] mx-auto">
      {otherPeopleQuestionnaires.map((questionnaire, index) => (
        <CardItem
          questionnaire={questionnaire}
          index={index}
          key={index}
          user={user || undefined}
        />
      ))}
    </div>
  )
}

export default Page
