import { Button, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { FirebaseError } from '@firebase/util'
import { useRouter } from '@src/hooks/hooks/useRouter'
import { useSignInWithGoogle } from '@src/hooks/firebase/useSignInWithGoogle'
import Image from 'next/image'

export const Page = () => {
  const toast = useToast()
  const { push } = useRouter()
  const signInWithGoogle = useSignInWithGoogle()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  const handleGoogleSignInOrUp = async () => {
    try {
      await signInWithGoogle()
      toast({
        title:
          mode === 'signin' ? 'サインインしました。' : 'サインアップしました。',
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
        console.error('Firebase Authentication Error', e)
      }
    }
  }

  return (
    <div className="w-[100%] flex  flex-col md:flex-row items-center h-[calc(100vh-110px)] overflow-y-hidden">
      <div
        className="w-[100%] bg-cover absolute  h-[calc(100vh-110px)] overflow-y-hidden md:hidden block z-[-1]"
        style={{ backgroundImage: `url("/theme.png")` }}
      ></div>
      <div
        className="w-full md:w-2/5 h-2/5 md:h-full flex items-center justify-center bg-cover bg-center z-[-2]"
        style={{ backgroundImage: `url("/theme.png")` }}
      ></div>
      <div className="md:w-3/5 md:h-full rounded-lg shadow-xl flex h-1/3 w-4/5 flex-col items-center  justify-center bg-white">
        <h3 className="md:text-xl text-sm mb-3 ">アンケートを、もっと手軽に</h3>
        <Image
          src="/logo.svg"
          width="380"
          height="50"
          alt="アンケトル"
          className="mb-20 md:block hidden"
        />
        <Image
          src="/logo.svg"
          width="200"
          height="50"
          alt="アンケトル"
          className="md:mb-20 mb-8 md:hidden block"
        />
        <Button
          onClick={handleGoogleSignInOrUp}
          className="flex items-center gap-2"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            width="20"
            height="20"
            className="md:block hidden"
          />
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            width="15"
            height="15"
            className="md:hidden block"
          />
          <p className="text-sm md:text-base">
            Googleで{mode === 'signin' ? 'サインイン' : 'サインアップ'}
          </p>
        </Button>
        <button
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
        >
          <a className="mt-4 md:text-sm text-xs text-gray-500 underline">
            {mode === 'signin'
              ? 'はじめての方はこちらから'
              : 'アカウントをお持ちの方はこちらから'}
          </a>
        </button>
      </div>
    </div>
  )
}

export default Page
