// src/pages/questionnaire/index.tsx
import { FormEvent, useState } from 'react'
import { getFirestore, collection, addDoc } from '@firebase/firestore'
import { FirebaseError } from '@firebase/util'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'tailwindcss/tailwind.css'

export const Page = () => {
  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [expiry, setExpiry] = useState(new Date())

  const handleSendQuestionnaire = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const db = getFirestore()
      const questionnaireCollection = collection(db, 'questionnaire')
      await addDoc(questionnaireCollection, {
        title,
        expiry,
        url,
      })
      setTitle('')
      setExpiry(new Date())
      setUrl('')
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    }
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>有効期限</FormLabel>
          <DatePicker
            selected={expiry}
            onChange={(date: Date) => setExpiry(date)}
            className="border border-gray-200 rounded-md w-[20.8rem] py-2 pl-2"
          />
          {/* FIXME:デザインゴリ押しすぎ */}
        </FormControl>
        <FormControl>
          <FormLabel>URL</FormLabel>
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </FormControl>
        <Button type="submit" className="mt-6">
          投稿
        </Button>
      </form>
    </div>
  )
}

export default Page
