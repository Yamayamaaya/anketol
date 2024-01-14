// src/pages/questionnaire/index.tsx
import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Checkbox,
} from '@chakra-ui/react' // Added Alert, AlertIcon
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'tailwindcss/tailwind.css'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import type { Questionnaire } from '@src/types/questionnaire'
import { Timestamp } from 'firebase/firestore'
import { useRouter } from 'next/router' // Added useRouter
import { activateQuestionnaire } from '@src/feature/questionnaire/activateQuestionneaire'
import { validateQuestionnaire as validate } from '@src/feature/questionnaire/validateQuestionnaire'
import CustomPage from '@src/components/CustomPage'
import { useSaveDataToFirestore } from 'src/hooks/firebase/useSaveDataToFirestore'
import { extractFormId } from '@src/feature/questionnaire/extractFormId'

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
        <form
          onSubmit={handleSendQuestionnaire}
          className="p-6 text-left border w-80 md:w-96 rounded-xl shadow-xl bg-white flex flex-col "
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
              className="border border-gray-200 rounded-md  w-[270px] md:w-[20.8rem] py-2 pl-2"
            />
            {/* FIXME:デザインゴリ押しすぎ */}
          </FormControl>
          <FormControl>
            <FormLabel className="pt-3">URL</FormLabel>
            <Input
              type="text"
              placeholder="googleフォームURL(回答用)"
              value={questionnaire.url}
              onChange={(e) =>
                setQuestionnaire({ ...questionnaire, url: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel className="pt-3">URL</FormLabel>
            <Input
              type="text"
              placeholder="googleフォームURL(編集用)"
              value={questionnaire.editUrl}
              onChange={(e) =>
                setQuestionnaire({ ...questionnaire, editUrl: e.target.value })
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
          <Button
            type="submit"
            px={16}
            py={0}
            colorScheme="blue"
            className="mt-6 self-center"
            size="sm"
          >
            投稿
          </Button>
        </form>
        <p className="mt-6 text-red-500">{inputError}</p>
      </div>
    </CustomPage>
  )
}

export default Page
