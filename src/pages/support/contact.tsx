import { useState } from 'react'
import { collection, addDoc, getFirestore } from 'firebase/firestore'
import { Input, Textarea, Button, useToast } from '@chakra-ui/react'
import type { Contact } from '@src/types/contacts'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import type { FirebaseError } from 'firebase/app'

export const ContactPage = () => {
  const { user } = useAuthContext() // Get the logged-in user's information

  const [contact, setContact] = useState<
    Pick<Contact, 'name' | 'email' | 'title' | 'message'>
  >({
    name: '',
    email: user?.email || '', // Set the logged-in user's email as the initial value
    title: '',
    message: '',
  })

  const [inputError, setInputError] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const toast = useToast()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Add validation
    if (!contact.name || !contact.email || !contact.title || !contact.message) {
      setInputError('全ての項目を入力してください。')
      return
    }

    const db = getFirestore()
    await addDoc(collection(db, 'contacts'), {
      ...contact,
      createdTime: new Date(),
      updatedTime: new Date(),
    })
      .catch((error: FirebaseError) => {
        toast({
          title: 'エラーが発生しました。',
          description: error.message,
          status: 'error',
          position: 'top',
        })
      })
      .then(() => {
        toast({
          title: 'お問い合わせが完了しました',
          status: 'success',
          position: 'top',
        })
        setIsSubmitted(true)
      })

    setContact({
      name: '',
      email: '',
      title: '',
      message: '',
    })
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      {isSubmitted ? (
        <p className="text-md text-black mt-6">
          お問い合わせありがとうございます。
          内容を確認の上、返信させていただきます。
        </p>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-black mt-6">お問い合わせ</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-4/5"
          >
            <label htmlFor="name" className="self-start mt-2 ml-1">
              名前
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              value={contact.name}
              onChange={handleChange}
              placeholder="名前"
              required
              my={1}
            />
            <label htmlFor="email" className="self-start mt-2 ml-1">
              メール
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              placeholder="ご登録のメールアドレス"
              required
              my={1}
            />
            <p className="text-xs self-start text-gray-500 md:ml-4 mb-2 md:text-sm">
              ※返信をご希望の場合はこのメールアドレスに返信いたします
            </p>
            <label htmlFor="title" className="self-start mt-2 ml-1">
              タイトル
            </label>
            <Input
              id="title"
              type="text"
              name="title"
              value={contact.title}
              onChange={handleChange}
              placeholder="お問い合わせのタイトル"
              required
              my={1}
            />
            <label htmlFor="message" className="self-start mt-2 ml-1">
              お問い合わせ内容
            </label>
            <Textarea
              id="message"
              name="message"
              value={contact.message}
              onChange={handleChange}
              placeholder="お問い合わせ内容"
              required
              my={1}
              resize="none"
              h={48}
            />
            <p className="text-sm self-start text-red-500 ml-4 mb-2">
              {inputError}
            </p>
            <Button
              type="submit"
              colorScheme="blue"
              variant="solid"
              py={0}
              my={4}
              px={16}
              borderRadius="md"
            >
              送信
            </Button>
          </form>
        </>
      )}
    </div>
  )
}

export default ContactPage
