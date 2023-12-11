// src/pages/questionnaire/index.tsx
import { useState } from 'react'
import type { FormEvent } from 'react'
import { getFirestore, collection, doc, setDoc } from '@firebase/firestore'
import { FirebaseError } from '@firebase/util'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'tailwindcss/tailwind.css'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'

interface Questionnaire {
  title: string
  url: string
  expiry: Date | null
}

export const Page = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>({
    title: '',
    url: '',
    expiry: null,
  })
  const [inputError, setInputError] = useState<string>('')
  const [id, setId] = useState<string>('')
  const { user } = useAuthContext()

  const handleSendQuestionnaire = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!varidate()) {
      return
    }
    try {
      const db = getFirestore()
      const questionnairesCollection = collection(db, 'questionnaires')
      if (user) {
        const userId = user.uid
        const docRef = doc(questionnairesCollection, id)
        await setDoc(docRef, {
          title: questionnaire.title,
          expiry: questionnaire.expiry,
          url: questionnaire.url,
          userId,
          createdTime: new Date(),
          updatedTime: new Date(),
        })
      }
      setQuestionnaire({
        title: '',
        url: '',
        expiry: null,
      })
      setInputError('')
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
        setInputError('問題が発生しました。再度お試しください。')
      }
    }
  }

  const varidate = () => {
    if (questionnaire.title === '') {
      setInputError('タイトルを入力してください')
      return false
    }
    if (questionnaire.url === '') {
      setInputError('URLを入力してください')
      return false
    } else if (
      // https://docs.google.com/forms/d/e/[FORM_ID]/viewformの形式であるか
      !questionnaire.url.match(
        /^https:\/\/docs.google.com\/forms\/d\/e\/.+\/viewform$/
      ) &&
      !!questionnaire.url.split('/')[6]
    ) {
      setInputError('URLが正しくありません')
      return false
    }

    setId(questionnaire.url.split('/')[6] ?? '')
    return true
  }

  return (
    <div className="flex flex-col items-center py-2">
      <form
        onSubmit={handleSendQuestionnaire}
        className="p-6 mt-6 text-left border w-96 rounded-xl shadow-xl bg-white"
      >
        <FormControl>
          <FormLabel>タイトル</FormLabel>
          <Input
            type="text"
            value={questionnaire.title}
            placeholder="アンケートタイトル"
            onChange={(e) =>
              setQuestionnaire({ ...questionnaire, title: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>有効期限</FormLabel>
          <DatePicker
            selected={questionnaire.expiry}
            onChange={(date: Date) =>
              setQuestionnaire({ ...questionnaire, expiry: date })
            }
            placeholderText="有効期限"
            className="border border-gray-200 rounded-md w-[20.8rem] py-2 pl-2"
          />
          {/* FIXME:デザインゴリ押しすぎ */}
        </FormControl>
        <FormControl>
          <FormLabel>URL</FormLabel>
          <Input
            type="text"
            placeholder="googleフォームのURL"
            value={questionnaire.url}
            onChange={(e) =>
              setQuestionnaire({ ...questionnaire, url: e.target.value })
            }
          />
        </FormControl>
        <Button type="submit" className="mt-6">
          投稿
        </Button>
      </form>
      <p className="mt-6 text-red-500">{inputError}</p>
    </div>
  )
}

export default Page
