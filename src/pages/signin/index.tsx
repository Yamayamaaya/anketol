import { Button, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { FirebaseError } from '@firebase/util'
import { useRouter } from '@src/hooks/hooks/useRouter'
import { signInWithGoogle } from '@src/lib/firebase/firebase'
import Image from 'next/image'
import { Navigate } from '@src/component/Navigate'

export const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const { push } = useRouter()

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithGoogle()
      toast({
        title: 'ログインしました。',
        status: 'success',
        position: 'top',
      })
      push((path) => path.$url())
    } catch (e) {
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      })
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-[100%] flex items-center overflow-y-hidden">
      <div
        className="w-2/5 h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url("/theme.png")` }}
      ></div>
      <div className="w-3/5 h-full flex flex-col items-center justify-center">
        <h3 className="text-xl mb-3">アンケートを、もっと手軽に</h3>
        <Image
          src="/logo.svg"
          width="400"
          height="50"
          alt="アンケトル"
          className="mb-20"
        />
        <Button
          onClick={handleGoogleSignIn}
          isLoading={isLoading}
          className="flex items-center gap-2"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            width="20"
            height="20"
          />
          <p>Googleでサインイン</p>
        </Button>
        <Navigate href={(path) => path.signup.$url()}>
          <a className="mt-4 text-sm text-gray-500 underline">
            サインアップはこちらから
          </a>
        </Navigate>
      </div>
    </div>
  )
}

export default Page
