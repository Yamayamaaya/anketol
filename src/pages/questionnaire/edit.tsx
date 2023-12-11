// src/pages/questionnaire/edit/[id].tsx
import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { getFirestore, doc, getDoc, updateDoc } from '@firebase/firestore'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'tailwindcss/tailwind.css'
import type { Questionnaire } from '@src/types/questionnaire'
import type { Omit } from 'utility-types'
import { Timestamp } from 'firebase/firestore'

export const Page = () => {
  const [questionnaire, setQuestionnaire] = useState<
    Omit<Questionnaire, 'userId' | 'createdTime' | 'updatedTime'>
  >({
    title: '',
    url: '',
    expiry: null,
  })
  const [inputError, setInputError] = useState<string>('')
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      const db = getFirestore()
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
      await updateDoc(docRef, {
        title: questionnaire.title,
        expiry: questionnaire.expiry,
        url: questionnaire.url,
        updatedTime: new Date(),
      })
      setInputError('')
    } catch (e) {
      setInputError('問題が発生しました。再度お試しください。')
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
    return true
  }

  return (
    <div className="flex flex-col items-center py-2">
      <form
        onSubmit={handleUpdateQuestionnaire}
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
            selected={
              questionnaire.expiry ? questionnaire.expiry.toDate() : null
            }
            onChange={(date: Date) =>
              setQuestionnaire({
                ...questionnaire,
                expiry: Timestamp.fromDate(date),
              })
            }
            placeholderText="有効期限"
            className="border border-gray-200 rounded-md w-[20.8rem] py-2 pl-2"
          />
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
          更新
        </Button>
      </form>
      <p className="mt-6 text-red-500">{inputError}</p>
    </div>
  )
}

export default Page
