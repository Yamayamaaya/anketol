import { Button, useToast } from '@chakra-ui/react'
import {
  signInWithGoogle,
  saveUserToFirestore,
} from '@src/lib/firebase/firebase'
import Image from 'next/image'
import { Navigate } from '@src/components/Navigate'
import { useRouter } from '@src/hooks/hooks/useRouter'

export const Page = () => {
  const toast = useToast()
  const { push } = useRouter()

  const handleGoogleSignUp = async () => {
    try {
      const userCredential = await signInWithGoogle()
      console.log(userCredential)
      if (userCredential?.user) {
        await saveUserToFirestore(userCredential.user)
        toast({
          title: 'サインアップしました。',
          status: 'success',
          position: 'top',
        })
        push((path) => path.$url())
      }
    } catch (e) {
      console.error('Firebase Authentication Error', e)
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      })
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
          onClick={handleGoogleSignUp}
          className="flex items-center gap-2"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            width="20"
            height="20"
          />
          <p>Googleでサインアップ</p>
        </Button>
        {/* サインインはこちらから */}
        <Navigate href={(path) => path.signin.$url()}>
          <a className="mt-4 text-sm text-gray-500 underline">
            アカウントをお持ちの方はこちらから
          </a>
        </Navigate>
      </div>
    </div>
  )
}

export default Page
