// src/pages/questionnaire/edit/[id].tsx
import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { getFirestore, doc, getDoc, updateDoc } from '@firebase/firestore'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Checkbox,
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'tailwindcss/tailwind.css'
import type { Questionnaire } from '@src/types/questionnaire'
import { Timestamp } from 'firebase/firestore'
import { activateQuestionnaire } from '@src/feature/questionnaire/activateQuestionneaire'

export const Page = () => {
  const [questionnaire, setQuestionnaire] = useState<
    Pick<Questionnaire, 'title' | 'url' | 'expiry' | 'active'>
  >({
    title: '',
    url: '',
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
    <div className="flex flex-col items-center py-2">
      <form
        onSubmit={handleUpdateQuestionnaire}
        className="p-6 mt-6 text-left border w-96 rounded-xl shadow-xl bg-white"
      >
        <FormControl>
          <FormLabel className="pt-3">タイトル</FormLabel>
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
          <FormLabel className="pt-3">有効期限</FormLabel>
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
          <FormLabel className="pt-3">URL</FormLabel>
          <Input
            type="text"
            placeholder="googleフォームのURL"
            value={questionnaire.url}
            onChange={(e) =>
              setQuestionnaire({ ...questionnaire, url: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel className="pt-3">有効</FormLabel>
          <Checkbox
            isChecked={questionnaire.active}
            onChange={(e) =>
              setQuestionnaire({ ...questionnaire, active: e.target.checked })
            }
          />
          {questionnaire.active ? (
            <p
              className="text-gray-500 text-sm
            "
            >
              ※他のアンケートを無効にします
            </p>
          ) : (
            <></>
          )}
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
