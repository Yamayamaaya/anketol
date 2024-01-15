// src/pages/questionnaire/edit/[id].tsx
import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { getFirestore, doc, getDoc, updateDoc } from '@firebase/firestore'
import { useToast } from '@chakra-ui/react'
import 'react-datepicker/dist/react-datepicker.css'
import 'tailwindcss/tailwind.css'
import type { Questionnaire } from '@src/types/questionnaire'
import { activateQuestionnaire } from '@src/feature/questionnaire/activateQuestionneaire'
import QuestionnaireForm from '@src/components/questionaireForm'
import CustomPage from '@src/components/CustomPage'

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
  const router = useRouter()
  const { id } = router.query
  const toast = useToast()

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      const db = getFirestore()
      if (!id) {
        return
      }
      const docRef = doc(db, 'questionnaires', id as string)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setQuestionnaire(docSnap.data() as Questionnaire)
      }
    }

    fetchQuestionnaire()
  }, [id])

  const handleUpdateQuestionnaire = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) {
      return
    }
    try {
      const db = getFirestore()
      const docRef = doc(db, 'questionnaires', id as string)
      if (id) {
        await updateDoc(docRef, {
          title: questionnaire.title,
          expiry: questionnaire.expiry,
          url: questionnaire.url,
          updatedTime: new Date(),
        }).then(() => {
          activateQuestionnaire(id as string)
        })
        router.push('/')
      }
      setInputError('')
      toast({
        title: '更新しました。',
        status: 'success',
        position: 'top',
      })
    } catch (e) {
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      })
    }
  }

  const validate = () => {
    if (questionnaire.title === '') {
      setInputError('タイトルを入力してください')
      return false
    }
    if (questionnaire.url === '') {
      setInputError('URLを入力してください')
      return false
    } else if (
      !questionnaire.url.match(
        /^https:\/\/docs.google.com\/forms\/d\/e\/.+\/viewform$/
      )
    ) {
      setInputError('URLが正しくありません')
      return false
    }

    if (questionnaire.expiry === null) {
      setInputError('有効期限を入力してください')
      return false
    }

    return true
  }

  return (
    <CustomPage title="アンケート編集">
      <div className="flex flex-col items-center py-2">
        <QuestionnaireForm
          questionnaire={questionnaire}
          setQuestionnaire={setQuestionnaire}
          onSubmit={handleUpdateQuestionnaire}
          inputError={inputError}
          defaultValue={questionnaire}
        />
        <p className="mt-6 text-red-500">{inputError}</p>
      </div>
    </CustomPage>
  )
}

export default Page
