import {
  Avatar,
  Box,
  Button,
  chakra,
  Container,
  Flex,
  Heading,
  Input,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { collection, addDoc, onSnapshot } from '@firebase/firestore'
import { FirebaseError } from '@firebase/util'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { getFirestore } from 'firebase/firestore'

type MessageProps = {
  message: string
}

const Message = ({ message }: MessageProps) => {
  return (
    <Flex alignItems={'start'}>
      <Avatar />
      <Box ml={2}>
        <Text bgColor={'gray.200'} rounded={'md'} px={2} py={1}>
          {message}
        </Text>
      </Box>
    </Flex>
  )
}

export const Page = () => {
  const messagesElementRef = useRef<HTMLDivElement | null>(null)
  const [message, setMessage] = useState<string>('')

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const db = getFirestore()
      const chatCollection = collection(db, 'chat')
      await addDoc(chatCollection, {
        message,
      })
      setMessage('')
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    }
  }

  const [chats, setChats] = useState<{ message: string }[]>([])

  useEffect(() => {
    try {
      const db = getFirestore()
      const chatCollection = collection(db, 'chat')
      return onSnapshot(chatCollection, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = doc.data()
          if ('message' in data) {
            const message = String(data['message'] ?? '')
            setChats((prev) => [...prev, { message }])
          }
        })
      })
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e)
      }
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    messagesElementRef.current?.scrollTo({
      top: messagesElementRef.current.scrollHeight,
    })
  }, [chats])

  return (
    <AuthGuard>
      <Container
        py={14}
        flex={1}
        display={'flex'}
        flexDirection={'column'}
        minHeight={0}
      >
        <Heading>チャット!</Heading>
        <Spacer flex={'none'} height={4} aria-hidden />
        <Flex
          flexDirection={'column'}
          overflowY={'auto'}
          gap={2}
          ref={messagesElementRef}
        >
          {chats.map((chat, index) => (
            <Message message={chat.message} key={`ChatMessage_${index}`} />
          ))}
        </Flex>
        <Spacer aria-hidden />
        <Spacer height={2} aria-hidden flex={'none'} />
        <chakra.form display={'flex'} gap={2} onSubmit={handleSendMessage}>
          <Input value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button type={'submit'}>送信!</Button>
        </chakra.form>
      </Container>
    </AuthGuard>
  )
}

export default Page
