// src/pages/questionnaire/index.tsx
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useToast } from '@chakra-ui/react' // Added Alert, AlertIcon
import 'react-datepicker/dist/react-datepicker.css'
import 'tailwindcss/tailwind.css'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import type { Questionnaire } from '@src/types/questionnaire'
import { useRouter } from 'next/router'
import { activateQuestionnaire } from '@src/feature/questionnaire/activateQuestionneaire'
import { validateQuestionnaire as validate } from '@src/feature/questionnaire/validateQuestionnaire'
import CustomPage from '@src/components/CustomPage'
import { useSaveDataToFirestore } from 'src/hooks/firebase/useSaveDataToFirestore'
import { extractFormId } from '@src/feature/questionnaire/extractFormId'
import QuestionnaireForm from '@src/components/questionaireForm'

// TODO: edit.tsxと共通化
export const Page = () => {
  const [questionnaire, setQuestionnaire] = useState<
    Pick<Questionnaire, 'title' | 'url' | 'editUrl' | 'expiry' | 'active'>
  >({
    title: '',
    url: '',
    editUrl: '',
    expiry: null,
    active: false,
  })
  const [inputError, setInputError] = useState<string>('')
  const { user } = useAuthContext()
  const router = useRouter()
  const toast = useToast()
  const saveDataToFirestore = useSaveDataToFirestore() // Added hook

  const handleSendQuestionnaire = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValid = validate(questionnaire)
    if (isValid !== '') {
      setInputError(isValid)
      return
    }

    const id = await extractFormId(questionnaire.editUrl)
    if (!user || !id) {
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      })
      return
    }
    try {
      await saveQuestionnaireToDB(user.uid, id)
      await activateQuestionnaire(id)

      resetForm()
      toast({
        title: '投稿しました。',
        status: 'success',
        position: 'top',
      })
      router.push('/doc/SetUpAndHelp')
    } catch (e) {
      console.error('Firebase Error', e)
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      })
    }
  }

  const saveQuestionnaireToDB = async (userId: string, id: string) => {
    await saveDataToFirestore(
      'questionnaires',
      {
        title: questionnaire.title,
        expiry: questionnaire.expiry,
        url: questionnaire.url,
        editUrl: questionnaire.editUrl,
        userId,
        createdTime: new Date(),
        updatedTime: new Date(),
        isAuthenticated: false,
      },
      id
    )
  }

  const resetForm = () => {
    setQuestionnaire({
      title: '',
      url: '',
      editUrl: '',
      expiry: null,
      active: false,
    })
    setInputError('')
  }

  return (
    <CustomPage title="アンケート投稿" isAuthPageHidden={!user}>
      <div className="flex flex-col items-center py-2">
        <QuestionnaireForm
          questionnaire={questionnaire}
          setQuestionnaire={setQuestionnaire}
          onSubmit={handleSendQuestionnaire}
          inputError={inputError}
        />
      </div>
    </CustomPage>
  )
}

export default Page
