import type { NextPage } from 'next'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { useUserById } from '@src/hooks/firestoreDocument/useUser'
import { useQuestionnaires } from '@src/hooks/firestoreDocument/useQuestionnaire'
import { useEffect, useState } from 'react'
import { CardItem } from '@src/components/CardItem'
import CustomPage from '@src/components/CustomPage'

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
    <CustomPage title="アンケート一覧" isSetUpOGP={false}>
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <div className="md:w-3/5 flex flex-col items-center justify-center gap-2 max-w-[530px]">
          {otherPeopleQuestionnaires.map((questionnaire, index) => (
            <CardItem
              questionnaire={questionnaire}
              key={index}
              user={user || undefined}
            />
          ))}
        </div>
      </div>
    </CustomPage>
  )
}

export default Page
